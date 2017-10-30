import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import  { View, Text } from 'react-native'
import FlippableCard from './FlippableCard'

import {
  asyncGetDeck,
} from "../actions/AsyncActions";

class DeckQuizDisconnected extends Component {

  constructor(props){
    super(props);
    this.state = {
      questionIndex: 0,
      correctAnswers: 0,
      showQuizResults: false
    }

  }

  componentWillMount(){
    const { getDeck } = this.props;
    getDeck()
  }

  handleAnswer = (answer) => {

     const { questionIndex, correctAnswers } = this.state;
     const { deck } =  this.props;
     const { questions } = deck;
     const lastQuestionIndex = questions.length -1 ;

    if (answer) {
      this.setState({correctAnswers: correctAnswers + 1});
    }

    if (questionIndex !== lastQuestionIndex ) {
      this.setState({ questionIndex: questionIndex + 1 })
    } else {
      this.setState({ showQuizResults: true })
    }

  };

  render(){
    const {deck, navigation} =  this.props;
    const { questions } =  deck;
    const { navigate } =  navigation;
    const { handleAnswer } =  this;
    const { showQuizResults, questionIndex, correctAnswers} =  this.state;
    
    if(showQuizResults) {
      return(
        
        <View>
          <Text>
            correct answers: {`${correctAnswers}/${questions.length}`}
          </Text>
          <Text>
            percentage  of correct answers: {`${((correctAnswers/questions.length) * 100).toFixed(2)}%` }
          </Text>
        </View>
        
      )
    }

    return(

        <FlippableCard
          questions={questions}
          questionIndex={questionIndex}
          handleAnswer={handleAnswer}
        />

    )
  }

}

DeckQuizDisconnected.propTypes = {
  getDeck: PropTypes.func.isRequired,
  deck:    PropTypes.object.isRequired,
};

function mapStateToProps(state, OwnProps){
  const { deckKey } = OwnProps.navigation.state.params;
  return {
    deck: state[deckKey]
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  const { deckKey } = OwnProps.navigation.state.params;
  return {
    getDeck:  asyncGetDeck(dispatch)(deckKey),
  }
}

const DeckQuiz = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckQuizDisconnected);
export default DeckQuiz;