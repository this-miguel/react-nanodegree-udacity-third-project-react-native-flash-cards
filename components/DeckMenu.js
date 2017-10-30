import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native';
import help from '../utils/helpers';

import {
  asyncGetDeck,
} from "../actions/AsyncActions";

class DeckMenuDisconnected extends Component {

  componentWillMount(){
    const { getDeck } = this.props;
    getDeck()
  }

  render(){

    const { deck, navigation } =  this.props;
    const { questions } = deck;
    const hasCards = questions.length !== 0;
    const { navigate } =  navigation;
    const { replaceWhiteSpaces } = help;

    return(
      <View>
        <Text>{deck.title}</Text>
        <Text>cards {deck.questions.length}</Text>

        {
          hasCards &&
          <TouchableOpacity
            onPress={() => navigate('DeckQuiz', {deckKey: replaceWhiteSpaces(deck.title) })}
          >
            <View style={{borderRadius: 6, backgroundColor: 'gray'}}>
              <Text>Quiz</Text>
            </View>
          </TouchableOpacity>
        }

        <TouchableOpacity
          onPress={() => navigate('AddCard', {deckKey: replaceWhiteSpaces(deck.title) })}
        >
          <View style={{borderRadius: 6, backgroundColor: 'gray'}}>
            <Text>Add Card</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

}

DeckMenuDisconnected.propTypes = {
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

const DeckMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckMenuDisconnected);
export default DeckMenu;