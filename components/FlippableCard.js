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

  flipToShowFront = () => {
      if (this.value >= 90) {
        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 120,
          easing: Easing.bezier(0.68, -0.55, 0.265, 1.55)
        }).start();
      }
  };

  handleAnswer = (answer) => {
    this.flipToShowFront();
    const { handleAnswer } = this.props;
    handleAnswer(answer)
  };

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

    const { questionIndex, questions } = this.props;
    const currentQuestion = questions[questionIndex];
    const {question, answer} = currentQuestion;
    const remainingCards =  questions.length - questionIndex;
    return (
      <View style={styles.container}>
        <View style={styles.cardsLeftPosition}>
          <Text style={styles.cardsLeftText}>{remainingCards} { remainingCards === 1 ? 'card' : 'cards'} remaining</Text>
        </View>
        <View>
          <Animated.View style={[ frontAnimatedStyle, styles.card, styles.cardDimensions]}>
            <Text style={[ styles.cardText, {} ]}>
              {question}
            </Text>
          </Animated.View>
          <Animated.View style={[ backAnimatedStyle, styles.card, styles.cardBack, styles.cardDimensions]}>
            <Text style={[ styles.cardText, { color: 'cadetblue'} ]}>
              {answer}
            </Text>
          </Animated.View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>

          <TouchableOpacity onPress={() => this.handleAnswer(true)} style={{flex:1}}>
            <Text style={[styles.button, {backgroundColor: '#bfe7bf', color: '#52B762'}]}>correct</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.flipCard()} style={{flex:1}}>
            <Text style={styles.button}>flip it!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleAnswer(false)} style={{flex:1}}>
            <Text style={[styles.button, {backgroundColor: '#ff8c95', color: 'white'}]}>incorrect</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

FlippableCard.propTypes = {
  handleAnswer: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  questions:    PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0A1128'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEC69',
  },
  cardBack: {

    backgroundColor: '#DDF6FE',
    position: "absolute",
    top: 0,
  },
  cardDimensions: {
    width: 260,
    height: 260,
    borderRadius: 4,

  },
  cardText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    padding: 20,
    borderRadius: 4,
    fontFamily: 'monospace',
    textAlign: 'center',
    opacity: 0.50,

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
  },
  cardsLeftPosition: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: "flex-end",
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardsLeftText: {
    textAlign: 'center',
    color: "#d8dfe5",
    padding: 6,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
});