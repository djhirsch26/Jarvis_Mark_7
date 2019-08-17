import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import { Button, COLOR } from 'react-native-material-ui';

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import JarvisInstance from './JarvisInstance'


class SkillButton extends React.Component {
  componentDidMount() {

  }

  onPress() {
    console.log("name", this.props.name)
    console.log("skill", this.props.skill)
    const Jarvis = JarvisInstance.getInstance(global.store)
    console.log(Jarvis)
    this.props.skill.action(Jarvis, {})
  }

  render() {
    console.log("name", this.props.name)
    console.log("skill", this.props.skill)

    return (
      <View style={styles.container}>
        <Button
        onPress={this.onPress.bind(this)}
        text={this.props.name}/>
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
