import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

export default class FlippableCard extends Component {

  componentWillMount() {

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: [0, 1]
    })
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue,{
        toValue: 0,
        duration: 777,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55)
      }).start();
    } else {
      Animated.timing(this.animatedValue,{
        toValue: 180,
        duration: 777,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55)
      }).start();
    }

  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ],
      opacity: this.backOpacity
    }
    return (
      <View style={[styles.container ]}>
        <View>
          <Animated.View style={[styles.card, frontAnimatedStyle, styles.cardDimensions]}>
            <Text style={[ styles.cardText, {backgroundColor: '#FFEC69'} ]}>
              this is the front.
            </Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.card, styles.cardBack, styles.cardDimensions]}>
            <Text style={[ styles.cardText, {backgroundColor: '#ebfdf2', color: 'cadetblue'} ]}>
              this is  the back.
            </Text>
          </Animated.View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>

          <TouchableOpacity onPress={() => (null)} style={{flex:1}}>
            <Text style={[styles.button, {backgroundColor: '#bfe7bf', color: '#52B762'}]}>correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.flipCard()} style={{flex:1}}>
            <Text style={styles.button}>flip it!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => (null)} style={{flex:1}}>
            <Text style={[styles.button, {backgroundColor: '#ff8c95', color: 'white'}]}>incorrect</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#989898'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d8dfe5',
  },
  cardBack: {

    backgroundColor: "#d8dfe5",
    position: "absolute",
    top: 0,
  },
  cardDimensions: {
    width: 260,
    height: 260,
    borderRadius: 4,

  },
  cardText: {
    width: 260,
    height: 260,
    fontSize: 20,
    color: 'black',
    fontWeight: '300',
    padding: 20,
    borderRadius: 4,
    fontFamily: 'Roboto',

  },
  button: {
    textAlign: 'center',
    backgroundColor: '#1a75ff',
    color: '#80b3ff',
    marginTop: 60,
    borderRadius: 4,
    padding: 6,
    marginRight: 8,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'monospace',
  }
});