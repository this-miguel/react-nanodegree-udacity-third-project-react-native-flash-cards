import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, View } from 'react-native';

import {
  asyncGetDeck,
} from "../actions/AsyncActions";

class DeckMenuDisconnected extends Component {

  componentWillMount(){
    const { getDeck } = this.props;
    getDeck()
  }

  render(){
    const {deck} =  this.props;
    return(
      <View>
        <Text>{deck.title}</Text>
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