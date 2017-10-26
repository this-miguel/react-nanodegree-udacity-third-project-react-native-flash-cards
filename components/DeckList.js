import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, ScrollView, View } from 'react-native';

import {
  asyncGetDecks,
} from "../actions/AsyncActions";

class DeckListDisconnected extends Component {

  componentWillMount(){
    const {getDecks} = this.props;
    getDecks()
  }

  render(){
    const {decks} =  this.props;
    return(
      <ScrollView>
        {
          decks.map( deck => <DeckListItem key={deck.title} title={deck.title} questionsNumber={deck.questions.length} /> )
        }
      </ScrollView>
    )
  }

}

const DeckListItem = ({title, questionsNumber }) => (
  <View>
    <Text>
      {title}
    </Text>
    <Text>
      number of cards {questionsNumber}
    </Text>
  </View>
);

DeckListItem.propTypes = {
  title: PropTypes.string.isRequired,
  questionsNumber: PropTypes.number.isRequired,
};

DeckListDisconnected.propTypes = {
  getDecks: PropTypes.func.isRequired,
  decks:    PropTypes.array.isRequired,
};


function mapStateToProps(state){
  return {
    decks: Object.keys(state).map((deckKey) => (state[deckKey]))
  }
}

function mapDispatchToProps(dispatch){
  return {
    getDecks:  asyncGetDecks(dispatch),
  }
}
const DeckList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckListDisconnected);
export default DeckList;