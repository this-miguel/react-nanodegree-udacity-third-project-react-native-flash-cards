import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import help from '../utils/helpers';

import {
  asyncGetDeck,
  asyncAddCard
} from "../actions/AsyncActions";

class AddCardDisconnected extends Component {

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

    const { navigation, deck } =  this.props;
    const { title, questions } =  deck;
    const {handleSubmit} = this;
    const {question, answer} = this.state;
    const { navigate } =  navigation;
    const { replaceWhiteSpaces } = help;
    const validCard = replaceWhiteSpaces(question).length !== 0  &&
                      replaceWhiteSpaces(answer).length   !== 0;

    return(
      <View>

        <View>
          <Text>
            {title}
          </Text>
          <Text>
            number of cards {questions.length}
          </Text>
        </View>
        <View>
          <Text>
            card front / question
          </Text>
          <TextInput
            onChangeText={(question) => this.setState({question})}
            value={question}
            multiline = {true}
            numberOfLines = {3}
          />
        </View>
        <View>
          <Text>
            card back / answer
          </Text>
          <TextInput
            onChangeText={(answer) => this.setState({answer})}
            value={answer}
            multiline = {true}
            numberOfLines = {3}
          />
        </View>
        {
          validCard &&
          <TouchableOpacity
            onPress={ handleSubmit }
          >
            <View style={{borderRadius: 6, backgroundColor: 'gray'}}>
              <Text> Submit Card </Text>
            </View>
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