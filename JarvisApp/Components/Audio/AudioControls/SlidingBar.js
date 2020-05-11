import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import Draggable from '../../../utils/Draggable'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

class SlidingBar extends React.Component {

  constructor() {
    super()

    this.state = {
      dragPressed: false,
      dragPercent: 0,
      barWidth: 0,
      barX: 0,
      seekUpdate: false
    }
  }

  onLayout({nativeEvent}) {
    const {x,y,height, width} = nativeEvent.layout
    this.setState({barWidth: width})
    if (this.props.onMount) {
      this.props.onMount({nativeEvent})
    }
  }

  onPress({nativeEvent}) {
    this.setState({dragPressed: true})
    this.props.onPress({nativeEvent})
  }

  onDrag({nativeEvent}) {
    const {pageX} = nativeEvent
    const dragPercent = this.getDragPercent(pageX)
    this.setState({dragPercent})
    this.props.onDrag({pageX, dragPercent})
  }

  onRelease({nativeEvent}) {
    const {pageX} = nativeEvent
    const dragPercent = this.getDragPercent(pageX)
    this.setState({dragPressed: false, dragPercent, seekUpdate: true})
    this.props.onRelease({pageX, dragPercent})
  }

  getDragPercent(pageX) {
    return Math.max(0, Math.min(1, (pageX-this.state.barX)/this.state.barWidth))
  }

  static getDerivedStateFromProps(props, state) {
    return state.dragPressed ? {} : {dragPercent: props.progress}
  }


  componentDidMount() {
    setTimeout(() => this.myComponent.measure( (fx, fy, width, height, px, py) => {
            this.setState({barX: px, barWidth: width})
        }),0)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.dragPressed || this.state.dragPressed == nextState.dragPressed
}

  render() {
    const playedPercent = this.props.progress
    const played_width = this.state.barWidth * (this.state.dragPressed ? this.state.dragPercent : this.props.progress)
    const circle_center = this.state.barWidth * playedPercent - this.props.cursorSize/2

    return (
      <View style={styles.container} ref={view => { this.myComponent = view; }}>
        <View style={{marginTop: 20, marginBottom: 30, alignSelf: 'center', width: '100%', height: this.props.height}} onLayout={this.onLayout.bind(this)}>
          <View style={{position: 'absolute', alignSelf: 'flex-start', paddingTop: this.props.height + 4}}><Text>{this.props.leftText}</Text></View>
          <View style={{position: 'absolute', alignSelf: 'flex-end', paddingTop: this.props.height + 4}}><Text>{this.props.rightText}</Text></View>
          <View style={{position: 'absolute', alignSelf: 'flex-start', width: '100%', height: '100%', borderRadius: this.props.height, backgroundColor: this.props.backgroundColor}}/>
          <View style={{position: 'absolute', alignSelf: 'flex-start', width: played_width, height: '100%', borderRadius: this.props.height, backgroundColor: this.props.progressColor}}/>
          <View style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: played_width-this.props.cursorSize/2, width: this.props.cursorSize, borderRadius: this.props.cursorSize/2, height: this.props.cursorSize, marginTop: -this.props.cursorSize/2 + this.props.height/2, backgroundColor: this.props.cursor_color}}/>
          <Draggable
          minX={0 - this.props.cursorSize/2}
          minY={0}
          maxX={this.state.barWidth + this.props.cursorSize/2}
          maxY={0}
          xPos={circle_center}
          yPos={0}
          touchableOpacityProps={{hitSlop: {top: 10, left: 10, bottom: 10, right: 10}}}
          onDrag={this.onDrag.bind(this)}
          onPressIn={this.onPress.bind(this)}
          onRelease={this.onRelease.bind(this)}>
            <View style={{width: this.props.cursorSize, borderRadius: this.props.cursorSize/2, height: this.props.cursorSize, marginTop: -this.props.cursorSize/2 + this.props.height/2, backgroundColor: 'transparent'}}/>
          </Draggable>
        </View>
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

export default SlidingBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
