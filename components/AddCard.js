import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import help from '../utils/helpers';

import {
  asyncGetDeck,
  asyncAddCard
} from "../actions/AsyncActions";

class AddCardDisconnected extends Component {

  static navigationOptions = ({navigation}) => {
    const {deckTitle} = navigation.state.params;
    return {
      title: deckTitle
    }
  };

  constructor(props){
    super(props);
    this.initialState = {
      question: '',
      answer: '',
      showQuestionFirst: true,
    };
    this.state = this.initialState
  }

  componentWillMount(){
    const { getDeck } = this.props;
    getDeck()
  }

  handleSubmit = () => {

    const {question, answer} = this.state;
    const { addCard } =  this.props;

    addCard({ question, answer });
    this.setState(this.initialState);

  };

  render(){

    const { deck } =  this.props;
    const { questions } =  deck;
    const {handleSubmit} = this;
    const {question, answer, showQuestionFirst} = this.state;
    const { replaceWhiteSpaces } = help;
    const validCard = replaceWhiteSpaces(question).length !== 0  &&
                      replaceWhiteSpaces(answer).length   !== 0;

    const {
      container,
      card,
      cardDimensions,
      cardsLeftPosition,
      cardsLeftText,
      cardText,
      button
    } = styles;

    const questionView = (
      <View style={[card, cardDimensions , {backgroundColor: '#FFEC69', marginTop: 15}]}>
        <Text style={[ cardText, {opacity: 0.5}] }>
          (card front / question)
        </Text>
        <TextInput
          style={[cardText, {width: 200, opacity: 0.75}]}
          onChangeText={(question) => this.setState({question})}
          onFocus={() => this.setState({showQuestionFirst: true})}
          value={question}
          multiline = {true}
          numberOfLines = {3}
          autoFocus={showQuestionFirst}
        />
      </View>
    );

    const answerView = (
      <View style={[card, cardDimensions]}>
        <Text style={[ cardText, {opacity: 0.5}] }>
          (card back / answer)
        </Text>
        <TextInput
          style={[cardText, {width: 200, opacity: 0.75}]}
          onChangeText={(answer) => this.setState({answer, showQuestionFirst: false})}
          onFocus={() => this.setState({showQuestionFirst: false})}
          value={answer}
          multiline = {true}
          numberOfLines = {2}
          autoFocus={!showQuestionFirst}
        />
      </View>
    );

    return(
      <KeyboardAvoidingView behavior='padding' style={container}>
        <View style={cardsLeftPosition}>
            <Text style={cardsLeftText}>number of cards: {questions.length}</Text>
        </View>
        { showQuestionFirst && (
          <View>
          {questionView}
          {answerView}
          </View>
        )}
        { !showQuestionFirst && (
          <View>
            {answerView}
            {questionView}
          </View>
        )}
        {
          validCard &&
          <TouchableOpacity
            onPress={ handleSubmit }
          >
            <Text style={button} >Submit Card</Text>
          </TouchableOpacity>
        }
      </KeyboardAvoidingView>
    )
  }

}

AddCardDisconnected.propTypes = {
  getDeck: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deck: PropTypes.object.isRequired,
  deckKey:  PropTypes.string.isRequired,
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
    addCard:  asyncAddCard(dispatch)(deckKey),
    getDeck:  asyncGetDeck(dispatch)(deckKey),
  }
}

const AddCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCardDisconnected);
export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: '#0A1128',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDF6FE',
  },
  cardDimensions: {
    width: 260,
    height: 130,
    borderRadius: 4,
    marginBottom: 15,

  },
  cardText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 4,
    fontFamily: 'monospace',
    textAlign: 'center',
    opacity: 0.50,
  },
  button: {
    textAlign: 'center',
    backgroundColor: '#1a75ff',
    color: '#80b3ff',
    marginTop: 20,
    borderRadius: 4,
    padding: 6,
    marginRight: 5,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  cardsLeftPosition: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 10,
    marginBottom: 30,
    alignItems: 'flex-start'
  },
  cardsLeftText: {
    textAlign: 'center',
    color: '#DDF6FE',
    padding: 6,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
});