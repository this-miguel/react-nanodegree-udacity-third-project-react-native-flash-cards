import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import  { View, Text,StyleSheet,TouchableOpacity } from 'react-native'
import help from '../utils/helpers'
import FlippableCard from './FlippableCard'

import {
  asyncGetDeck,
} from "../actions/AsyncActions";

class DeckQuizDisconnected extends Component {

  constructor(props){
    super(props);
    this.initialState = {
      questionIndex: 0,
      correctAnswers: 0,
      showQuizResults: false
    };
    this.state = this.initialState

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
      const { replaceWhiteSpaces } = help;

      return(
        
        <View style={styles.container}>
          <View style={[styles.card, styles.cardDimensions]}>
            <Text style={[ styles.cardText, {fontWeight:'bold'} ]}>
              RESULTS
            </Text>
            <Text style={styles.cardText}>
              correct answers: {`${correctAnswers}/${questions.length}`}
            </Text>
            <Text style={styles.cardText}>
              percentage  of correct answers: {`${((correctAnswers/questions.length) * 100).toFixed(2)}%` }
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>

            <TouchableOpacity
              onPress={ () => navigate( 'DeckMenu', {deckKey: replaceWhiteSpaces(deck.title)} ) }
              style={{flex:1}}>
              <Text style={[styles.button, {backgroundColor: '#96ceb4', color: '#588c7e'}]}>go to deck menu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState(this.initialState)} style={{flex:1}}>
              <Text style={styles.button}>restart quiz!</Text>
            </TouchableOpacity>

          </View>
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
  cardDimensions: {

    width: 260,
    height: 260,
    borderRadius: 4,

  },
  cardText: {

    fontSize: 16,
    color: 'black',
    fontWeight: '300',
    padding: 20,
    borderRadius: 4,
    fontFamily: 'Roboto',
    textAlign: 'center',

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