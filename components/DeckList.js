import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import help from '../utils/helpers'

import {
  asyncGetDecks,
} from "../actions/AsyncActions";

class DeckListDisconnected extends Component {

  componentWillMount(){
    const {getDecks} = this.props;
    getDecks()
  }

  _renderItem = ({item}) => {
    const { navigation } =  this.props;
    const { navigate } = navigation;
    const { replaceWhiteSpaces } = help;

    return(
      <DeckListItem
        onPressItem={() => navigate( 'DeckMenu', {deckKey: replaceWhiteSpaces(item.title)} )}
        title={item.title}
        questionsNumber={item.questions.length}
      />
    )
  };

  _keyExtractor = (item) => item.title;

  render(){

    const { decks } =  this.props;
    return(
      <FlatList
        contentContainerStyle={styles.container}
        data={decks}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        scrollEnabled={true}
      />
    )
  }

}

const DeckListItem = ({title, questionsNumber, onPressItem }) => (
    <TouchableOpacity
      onPress={onPressItem}
    >
      <View style={[styles.card, styles.cardDimensions, styles.cardDirectionRow]}>
          <Text style={styles.cardText}>
            {title}
          </Text>
          <View style={styles.numberOfCardsView}>
            <Text style={styles.numberOfCards}>
              {questionsNumber} { questionsNumber === 1 ? 'card' : 'cards'}
            </Text>
          </View>
     </View>
    </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: '#0A1128'
  },
  card: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#D5E9FF',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  cardDimensions: {
    borderRadius: 4,
    height: 100
  },
  cardText: {
     fontSize: 20,
     color: '#424874',
     fontWeight: 'bold',
     padding: 20,
     borderRadius: 4,
     fontFamily: 'monospace',
     textAlign: 'left',

  },
  numberOfCards: {
    color: '#0A1128',
    padding: 6,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  numberOfCardsView: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 6,
    bottom: 6,
  },
  cardDirectionRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start"
  }
});