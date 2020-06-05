import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { Button, COLOR } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {ORG_IDENTIFIER} from '../../constants'

import {
  SiriShortcutsEvent,
  donateShortcut,
  suggestShortcuts
} from "react-native-siri-shortcut";

import JarvisInstance from './JarvisInstance'


class SkillButton extends React.Component {
  componentDidMount() {
    const opts = this.generateSiriOpts(this.props.skill, this.props.name)
    console.log("Siri Opts: ", opts)
  }

  generateSiriOpts(skill, skillName) {
    const title = skill.title
    const description = skill.description
    const canSearch = skill.canSearch==undefined ? false : skill.canSearch
    const canPredict = skill.canPredict==undefined ? false : skill.canPredict

    const opts = {
      activityType: ORG_IDENTIFIER + skillName, // This activity type needs to be set in `NSUserActivityTypes` on the Info.plist
      title: title,
      description: description,
      persistentIdentifier: skillName,
      isEligibleForSearch: canSearch,
      isEligibleForPrediction: canPredict,
    }

    return opts
  }

  onPress() {
    const Jarvis = JarvisInstance.getInstance(global.store)
    this.props.skill.action(Jarvis, {})
    donateShortcut(this.generateSiriOpts(this.props.skill, this.props.name))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
        onPress={this.onPress.bind(this)}
        text={this.props.buttonText ? this.props.buttonText : this.props.name}/>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillButton);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
