import React from 'react'
import { View, Text } from 'react-native'

class BaseController {
  static init() {}
  static resume() {}
  static pause() {}
  static onNext() {}
  static onPrev() {}
  static onShuffle() {}
  static setRepeating() {}
  static seek(x) {}
  static refresh() {}
  static playTrack() {}

  static enable() {
    throw new Error("Base Controller is Abstract; Must implement virtual getPlayerInfo");
  }

  static getPlayerInfo() {
    throw new Error("Base Controller is Abstract; Must implement virtual getPlayerInfo");
  }

  static prepareForDisable() {
    throw new Error("Base Controller is Abstract; Must implement virtual prepareForDisable");
  }

  static enable() {
    return this.getPlayerInfo();
  }

  static disable() {
    this.prepareForDisable();
  }

  static render() {return <View style={{flex: 0}}/>}
}

export default BaseController
