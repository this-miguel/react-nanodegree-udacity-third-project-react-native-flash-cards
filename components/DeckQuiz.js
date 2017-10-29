import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, View} from 'react-native';
import help from '../utils/helpers'

import {
  asyncGetDeck,
} from "../actions/AsyncActions";

class DeckQuizDisconnected extends Component {

  componentWillMount(){
    const { getDeck } = this.props;
    getDeck()
  }

  render(){
    const {deck, navigation} =  this.props;
    const { navigate } =  navigation;
    return(
      <View>
        <Text>{deck.title}</Text>
        <Text>DeckQuiz Component</Text>

      </View>
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