import BaseController from './BaseController'
import { WebView } from 'react-native-webview';
import Video from 'react-native-video'
import React from 'react'
import { View, Text } from 'react-native'

import {
  REPEAT
} from '../../../constants'

const BB_17 = 794640376
const BB_16 = 694265923
const BB = 716445702

const SC_EVENT = {
  PLAY: "SC.Widget.Events.PLAY",
  PAUSE: "SC.Widget.Events.PAUSE",
  SEEK: "SC.Widget.Events.SEEK",
  SOUNDINFO: "SC.Widget.Events.SOUNDINFO",
  TRACKSINFO: "SC.Widget.Events.TRACKSINFO",
  FRAME_LOAD: "SC.Widget.Events.FRAME_LOAD",
  URL_LOAD: "SC.Widget.Events.URL_LOAD",
  PLAY_PROGRESS: "SC.Widget.Events.PLAY_PROGRESS",
  FINISH: "SC.Widget.Events.FINISH",
}

const PLAYER_CONFIG = {
  color: "#ff5500",
  auto_play: true,
  hide_related: true,
  show_comments: false,
  show_user: false,
  show_reposts: false,
  show_teaser: false,
  visual: false,
  start_track: 0,
}

const INIT_CONFIG = {
  color: "#ff5500",
  auto_play: false,
  hide_related: true,
  show_comments: false,
  show_user: false,
  show_reposts: false,
  show_teaser: false,
  visual: false,
  start_track: 0,
}

class URLController extends BaseController {

  static init() {
    this.trackInfo_={}
    this.playerInfo_={
      playing: false,
      canShuffle: false,
      repeating: REPEAT.OFF,
    }
    this.callbacks_={}
    this.tracks_=[]
    this.tracksIndexes_={}
    this.tracksDirty_=true
    this.buffering_ = true
    this.callbacks_[SC_EVENT.FRAME_LOAD] = (function() {
      this.init_()
      const onInit = (function() {this.playPlaylist(BB, INIT_CONFIG)}).bind(this)
      // Rather than listen for all the SC listener initialization, we can probably wait out the race condition
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => onInit());
    }).bind(this)
  }

  static bindCallback_(eventID, callback) {
    this.callbacks_[eventID] = callback.bind(this)
    this.inject_("bind", eventID, `(playbackInfo) => {
      playbackInfo["type"] = "${eventID}";
      window.ReactNativeWebView.postMessage(JSON.stringify(playbackInfo));
    }`)
  }

  static updateTracksInfo_() {
    const INJECTED = `(function tryGetSounds() {
      window.player.getSounds(function(trackInfo) {
        var notComplete = false;
        for (var i = 0, len = trackInfo.length; i < len; i++) {
          if (trackInfo[i].title === undefined) {
            notComplete = true;
            break;
          }
        }
        if (notComplete) {
          setTimeout(function () {
            tryGetSounds();
          }, 200);
        } else {
          data = {trackInfo}
          data["type"] = "${SC_EVENT.TRACKSINFO}"
          window.ReactNativeWebView.postMessage(JSON.stringify(data))
        }
      })
      })();`;

    this.webref.injectJavaScript(INJECTED)
  }

  static updateTrackInfo_() {
    this.inject_("getCurrentSound", `function(data) {
      data["type"] = "${SC_EVENT.SOUNDINFO}"
      window.ReactNativeWebView.postMessage(JSON.stringify(data))
    }`)
  }

  static extractSCData(playbackInfo) {
    if (!this.trackInfo_.soundcloudId || this.trackInfo_.soundcloudId!=playbackInfo.soundId) {
      this.updateTrackInfo_()
    }
    const trackInfo = {...this.trackInfo_};

    const buffering = playbackInfo.loadedProgress == 0
    const playerInfo = {
      ...this.playerInfo_,
      playing: playbackInfo.type == SC_EVENT.PLAY ? true : (playbackInfo.type == SC_EVENT.PAUSE ? false : this.playerInfo_.playing),
      position: playbackInfo.currentPosition/1000,
      buffering: buffering,
    }

    this.buffering_ = buffering
    this.playerInfo_ = playerInfo;
    return {trackInfo, playerInfo}
  }

  static loadURL_(url, config=PLAYER_CONFIG) {

    const extract = function(key) {
      return config[key] != undefined ? config[key] : PLAYER_CONFIG[key]
    }

    const conf_ = `{
      color: "${extract("color")}",
      auto_play: ${extract("auto_play")},
      hide_related: ${extract("hide_related")},
      show_comments: ${extract("show_comments")},
      show_user: ${extract("show_user")},
      show_reposts: ${extract("show_reposts")},
      show_teaser: ${extract("show_teaser")},
      visual: ${extract("visual")},
      start_track: ${extract("start_track")},
      callback: function(data={}) {
        data["type"] = "${SC_EVENT.URL_LOAD}"
        data["url"] = "${url}"
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
      },
    }`

    this.inject_("load", `"${url}"`, conf_)
  }

  static init_() {
    if (this.initialized_) {
      return;
    }
    // Should always be true. This method must be called after the component has loaded
    if (this.webref) {
      const INJECTED = `(function() {
        window.player = window.SC.Widget("sc_player")
        })();`;
      this.webref.injectJavaScript(INJECTED);
      this.initialized_=true;


      // SET UP LISTENERS
      this.bindCallback_(SC_EVENT.PLAY, (playbackInfo) => {
        var {trackInfo, playerInfo} = this.extractSCData(playbackInfo)
        global.audioEvents.emit('play', {trackInfo, playerInfo})
      })

      this.bindCallback_(SC_EVENT.PLAY_PROGRESS, (playbackInfo) => {
        const buffering = playbackInfo.loadedProgress == 0
        if (this.buffering_ != buffering) {
          var {trackInfo, playerInfo} = this.extractSCData(playbackInfo)
          global.audioEvents.emit('play', {trackInfo, playerInfo})
        }
      })

      this.bindCallback_(SC_EVENT.PAUSE, (playbackInfo) => {
        var {trackInfo, playerInfo} = this.extractSCData(playbackInfo)
        global.audioEvents.emit('pause', {trackInfo, playerInfo})
      })

      this.bindCallback_(SC_EVENT.SEEK, (playbackInfo) => {
        var {trackInfo, playerInfo} = this.extractSCData(playbackInfo)
        global.audioEvents.emit('seek', {trackInfo, playerInfo})
      })

      this.bindCallback_(SC_EVENT.FINISH, (playbackInfo) => {
        if (this.playerInfo_.repeating == REPEAT.TRACK || (this.playerInfo_.repeating == REPEAT.CONTEXT && this.tracksDirty_)) {
          this.inject_("skip", this.tracksDirty_ ? 0 : this.trackInfo_.index)
        } else if (this.playerInfo_.repeating == REPEAT.CONTEXT && (this.tracks_.length -1) == this.trackInfo_.index) {
          this.inject_("skip", 0)
        }

      })

      const extractSoundInfo = function(soundInfo) {
        return ({
          name: soundInfo.title,
          duration: soundInfo.duration/1000,
          artist: soundInfo.publisher_metadata.artist || (soundInfo.user ? soundInfo.user.full_name : ""),
          album: soundInfo.genre,
          image: soundInfo.artwork_url,
          id: ""+soundInfo.id,
          soundcloudId: soundInfo.id
        })
      }

      this.callbacks_[SC_EVENT.SOUNDINFO] = (function(soundInfo) {
        this.trackInfo_ = {
          ...this.trackInfo_,
          ...extractSoundInfo(soundInfo),
          index: this.getTrackIndex_(soundInfo.id),
        }

        for (var i = 0; i < this.tracks_.length; i++) {
          if (this.trackInfo_.id == this.tracks_[i].id && this.trackInfo_.name !== this.tracks_[i].name) {
            this.tracks_[i] = this.trackInfo_
            global.audioEvents.emit('update_tracks', this.tracks_)
          }
        }
        const trackInfo = {...this.trackInfo_}
        global.audioEvents.emit('track_change', {trackInfo, playerInfo: this.playerInfo_})
      }).bind(this)


      this.callbacks_[SC_EVENT.TRACKSINFO] = (function({trackInfo}) {
        const tracks = trackInfo.map((track, index) => {
          this.tracksIndexes_[track.id] = index
          if (index == 0) {
            this.trackInfo_={
              ...extractSoundInfo(track),
              index: index,
              playlist: this.playlist_,
            }
          }
          return {
            ...extractSoundInfo(track),
            index: index,
            playlist: this.playlist_,
          }
        })
        this.tracks_ = tracks
        this.tracksDirty_ = false;

        if (this.updateTracksPromise_) {this.updateTracksPromise_.resolve();this.updateTracksPromise_=null}
        global.audioEvents.emit('update_tracks', tracks)
      }).bind(this)

      this.callbacks_[SC_EVENT.URL_LOAD] = (function(data) {
        if (data.url.includes("playlist")) {
          this.playlist_ = data.url.split("/").slice(-1)[0]
          this.updateTracksInfo_()
        } else if (data.url.includes("track")) {
          this.tracksDirty_ = true;
          this.updateTrackInfo_()
        }
      }).bind(this)


    }
  }

  static enable() {

    // global.audioEvents.emit('update_tracks', tracks)
  }

  static getTrackIndex_(id) {
    if (this.tracksIndexes_ && id in this.tracksIndexes_) {
      return this.tracksIndexes_[id]
    }
    return 0;
  }

  static prepareForDisable() {
    if (this.initialized_) {
      this.inject_("unbind", SC_EVENT.PLAY)
      this.inject_("unbind", SC_EVENT.PAUSE)
      this.inject_("unbind", SC_EVENT.SEEK)
      this.inject_("unbind", SC_EVENT.PLAY_PROGRESS)
      this.inject_("unbind", SC_EVENT.FINISH)
      this.initialized_ = false;
    }
  }

  static getPlayerInfo() {
    return this.playerInfo_
  }

  static escapeJS(str="") {
    return str.replace(/"/g, '\\"');
  }

  static inject_(method, ...args) {
    if (this.webref) {
      const args_ = "(" + args.join(", ") + ")"
      const INJECTED = `(function() {
        window.player["${method}"]${args_};
        })();`;
        // console.log("Going to Inject", INJECTED)
      this.webref.injectJavaScript(INJECTED)
    }
  }

  static resume() {
    this.inject_('play')
  }

  static pause() {
    this.inject_('pause')
  }

  static onNext() {
    this.inject_('next')
  }

  static onPrev() {
    if (!this.tracksDirty_ && this.trackInfo_.index == 0) {
      this.inject_("skip", this.tracks_.length - 1)
    } else {
      this.inject_('prev')
    }
  }

  static onShuffle() {}

  static setRepeating(repeatMode) {
    this.playerInfo_.repeating = repeatMode

    const trackInfo = {...this.trackInfo_}
    const playerInfo = {...this.playerInfo_}
    global.audioEvents.emit('repeat', {trackInfo, playerInfo})
  }

  static seek(x) {
    this.inject_('seekTo', x*1000)
  }

  static refresh() {
    this.init_();
    const promise = new Promise(((resolve, reject) => {
      this.updateTracksPromise_ = {resolve, reject}
    }).bind(this))
    this.updateTracksInfo_()
    return promise;

  }

  static playTrack(track) {
    if (!this.tracksDirty_) {
      this.inject_("skip", track.index)
    } else {
      this.playPlaylist(track.playlist, {...PLAYER_CONFIG, start_track: track.index})
    }
  }

  static onMessage_(message) {
    var mightbeJSON = message.charAt(0) == '{'
    if (mightbeJSON) {
      try {
        var playbackInfo = JSON.parse(message)
        if (playbackInfo.type in this.callbacks_) {
          this.callbacks_[playbackInfo.type](playbackInfo)
          return;
        }
      } catch(e) {
        console.log(e)
      }
    }
    console.log("Webview Message", message)
  }

  static playURI(trackId, config=PLAYER_CONFIG) {
    this.loadURL_(`https://api.soundcloud.com/tracks/${trackId}`, config)
  }

  static playPlaylist(playlistId, config=PLAYER_CONFIG) {
    this.loadURL_(`https://api.soundcloud.com/playlists/${playlistId}`, config)
  }

  static render() {

  const SOUNDCLOUD_HTML = `
    <html lang="en">
    <body>
      <script src="https://w.soundcloud.com/player/api.js"></script>
      <script>
      function onFrameLoad() {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({type: "${SC_EVENT.FRAME_LOAD}"}));
        }
      }
      </script>
      <iframe id="sc_player" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/719102974" onload="onFrameLoad()"/>
    </body>
    </html>
    `;

    return (
      <View style={{maxHeight: 0}}>
      <Text> HI </Text>
        <WebView
        ref={r => (this.webref = r)}
        nativeConfig={{props: {webContentsDebuggingEnabled: true}}}
        onMessage={event => {this.onMessage_(event.nativeEvent.data);}}
        originWhitelist={["*"]}
        source={{ html: SOUNDCLOUD_HTML}}
        />
        <Text> BYE </Text>

      </View>
  )
  }

}

export default URLController
