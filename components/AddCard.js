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
      answer: ''
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
    const { title, questions } =  deck;
    const {handleSubmit} = this;
    const {question, answer} = this.state;
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

    return(
      <View style={container}>
        <View style={cardsLeftPosition}>
          <Text style={cardsLeftText}>number of cards: {questions.length}</Text>
        </View>
        <View style={[card, cardDimensions , {backgroundColor: '#FFEC69'}]}>
          <Text style={[ cardText, {opacity: 0.5}] }>
            (card front / question)
          </Text>
          <KeyboardAvoidingView behavior='padding'>
            <TextInput
              style={[cardText, {width: 200, opacity: 0.75}]}
              onChangeText={(question) => this.setState({question})}
              value={question}
              multiline = {true}
              numberOfLines = {3}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={[card, cardDimensions]}>
          <Text style={[ cardText, {opacity: 0.5}] }>
            (card back / answer)
          </Text>
          <KeyboardAvoidingView behavior='padding'>
            <TextInput
              style={[cardText, {width: 200, opacity: 0.75}]}
              onChangeText={(answer) => this.setState({answer})}
              value={answer}
              multiline = {true}
              numberOfLines = {3}
            />
          </KeyboardAvoidingView>
        </View>
        {
          validCard &&
          <TouchableOpacity
            onPress={ handleSubmit }
          >
            <KeyboardAvoidingView behavior='padding'>
              <Text style={button} >Submit Card</Text>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        }
      </View>
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
    height: 160,
    borderRadius: 4,
    marginBottom: 15,

  },
  cardText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '200',
    padding: 4,
    fontFamily: 'Roboto',
    textAlign: 'center',

  },
  button: {
    textAlign: 'center',
    backgroundColor: '#1a75ff',
    color: '#80b3ff',
    marginTop: 20,
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
    color: '#3b3a30',
    padding: 6,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
});