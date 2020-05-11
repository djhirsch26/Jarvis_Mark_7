import React from 'react'
import { View, Text, ActivityIndicator, Button, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'

import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import SlidingUpPanel from 'rn-sliding-up-panel';

import AudioSlider from '../Audio/Slider'
import AudioControls from '../Audio/AudioControls'

import {SLIDER} from '../../constants'

import {setSliderEnabled} from '../../actions'

class Slider extends React.Component {
  animatedValue = new Animated.Value(0)

  constructor() {
    super()
    this.state={
      animationValue: 0,
      tabBarHeight: 0,
      screenHeight: Dimensions.get('window').height,
    }
  }

  hideSlider() {
    this._panel.hide()
  }

  showSlider() {
    this._panel.show(this.state.screenHeight)
  }

  enableSlider() {
    if (!this.props.draggingEnabled) {
      this.props.setSliderEnabled(true)
    }
  }

  disableSlider() {
    if (this.props.draggingEnabled) {
      this.props.setSliderEnabled(false)
    }
  }

  componentDidMount() {
    this.listener = this.animatedValue.addListener(this.onAnimatedValueChange.bind(this))
    if (this.state.tabBarHeight) {
      this.showSlider()
    }
  }

  onAnimatedValueChange({ value }) {
    // Fired when the panel is moving
    // console.log(value)
    this.setState({animationValue: value})
  }

  renderSmallView_() {
    switch(this.props.content) {
      case SLIDER.BLANK:
      //   return (<Button title='Show panel' onPress={() => this._panel.show()} />)
      // case SLIDER.AUDIO:
        return (<AudioSlider ref={c => this.slider=c}/>)
    }
  }

  renderSmallView(opacity) {
    return (<TouchableWithoutFeedback onPress={this.showSlider.bind(this)}>
      <View style={{flex: 1, maxHeight: this.state.tabBarHeight, opacity: opacity}}>
        {this.renderSmallView_()}
        </View>
      </TouchableWithoutFeedback>
      )
  }

  renderLargeView_() {
    switch(this.props.content) {
      case SLIDER.BLANK:
      //   return (<View style={{flex: 1}}>
      //     <Text style={{}}>Here is the content inside panel</Text>
      //     <Button title='Hide' onPress={() => this._panel.hide()} />
      //   </View>)
      // case SLIDER.AUDIO:
        return <AudioControls
        hide={this.hideSlider.bind(this)}
        enableDragging={this.enableSlider.bind(this)}
        disableDragging={this.disableSlider.bind(this)}/>
    }
  }

  renderLargeView(opacity) {
    return (<View style={{flex: 1, opacity: opacity, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', backgroundColor: 'red'}}>
      {this.renderLargeView_()}
      </View>)
  }

  onLayout(event) {
    var {x, y, width, height} = event.nativeEvent.layout;
    console.log(x, y, width, height)
    this.setState({tabBarHeight: height})
    this._panel.show(height)
  }

  getTabBarHeight() {
    switch(this.props.content) {
      case SLIDER.BLANK:
      case SLIDER.AUDIO:
        return this.state.tabBarHeight
    }
  }

  render() {

    const percentAnimated = Math.min(1,this.state.animationValue/(this.state.screenHeight))
    const tabBarAnimation = percentAnimated * this.state.tabBarHeight * -1
    const tabBarMargin = isNaN(tabBarAnimation) ? 0 : tabBarAnimation

    const DRAGGABLE_OFFSET = 20

    var sliderOffset = Math.abs(this.state.animationValue - 2 * this.state.tabBarHeight)
    var withinOneTabBar =  sliderOffset < this.state.tabBarHeight
    const opacity = withinOneTabBar ? sliderOffset/this.state.tabBarHeight : 1
    // const opacity = 0.5

    return (
      <View>
        <View>
            <SlidingUpPanel
            animatedValue={this.animatedValue}
            ref={c => this._panel = c}
            snappingPoints={[this.state.screenHeight - DRAGGABLE_OFFSET, this.state.tabBarHeight]}
            allowDragging={this.props.draggingEnabled}
            draggableRange={{top: this.state.screenHeight - DRAGGABLE_OFFSET, bottom: this.state.tabBarHeight}}
            >
              {this.state.animationValue <= 2 * this.state.tabBarHeight ? this.renderSmallView(opacity) : this.renderLargeView(opacity)}
            </SlidingUpPanel>
        </View>
        <View style={{marginTop: tabBarMargin, bottom: tabBarMargin}} onLayout={this.onLayout.bind(this)}>
          {this.props.children}
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    content: state.slider.content,
    draggingEnabled: state.slider.draggingEnabled
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSliderEnabled,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
