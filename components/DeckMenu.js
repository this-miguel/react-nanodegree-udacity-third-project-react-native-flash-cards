import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
    const numberOfCards = deck.questions.length;

    return(
      <View style={styles.container}>
        <View style={[styles.card, styles.cardDimensions]}>
        <Text>{deck.title}</Text>
        <Text>{numberOfCards === 1 ? '1 card' : `${numberOfCards} cards`}</Text>
      </View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
          {
            hasCards &&
            <TouchableOpacity
              onPress={() => navigate('DeckQuiz', {deckKey: replaceWhiteSpaces(deck.title) })}
              style={{flex:1}}
            >
              <View>
                <Text style={[styles.button, {backgroundColor: '#96ceb4', color: '#588c7e'}]}>Quiz</Text>
              </View>
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={() => {
              navigate(
                'AddCard',
                {
                  deckKey: replaceWhiteSpaces(deck.title),
                  deckTitle: deck.title
                }
              )
            }}
            style={{flex:1}}
          >
            <View >
              <Text style={[styles.button]}>Add Card</Text>
            </View>
          </TouchableOpacity>
        </View>

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