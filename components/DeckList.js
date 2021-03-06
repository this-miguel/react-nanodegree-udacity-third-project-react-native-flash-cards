import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import { Text, FlatList, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import help from '../utils/helpers'

import {
  asyncGetDecks,
} from "../actions/AsyncActions";

class DeckListDisconnected extends Component {

  componentWillMount(){
    const {getDecks} = this.props;
    getDecks()
  }

  _onPressItem = (item) => {
    const { navigation } =  this.props;
    const { navigate } = navigation;
    const { replaceWhiteSpaces } = help;

    // give a bit of time to the animation on DeckListItem to run before initiating the navigation action.
    setTimeout(
      () =>  {
        navigate(
          'DeckMenu',
          {
            deckKey: replaceWhiteSpaces(item.title),
            deckTitle: item.title

          }
        );
      },
      250
    )

  };

  _renderItem = ({item}) => {

    return(
      <DeckListItem
        onPressItem={() => this._onPressItem(item)}
        title={item.title}
        questionsNumber={item.questions.length}
      />
    )
  };

  _keyExtractor = (item) => item.title;

  render(){

    const { decks } =  this.props;
    if(decks === undefined || decks === null || decks.length === 0 ){

      const {containerEmpty, warningCard, cardText} = styles;

      return(
        <View style={containerEmpty}>
          <View style={warningCard}>
            <Text style={[cardText, { opacity: 0.5 }]}>
              You have not created decks yet. Please tab in the 'NEW DECK' tab above to create one.
            </Text>
          </View>
        </View>
      )
    }

    const { background, container } =  styles;

    return(
      <View style={background}>
        <FlatList
          contentContainerStyle={container}
          data={decks}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          scrollEnabled={true}
        />
      </View>
    )
  }

}

class DeckListItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      height: new Animated.Value(110),
      margin: new Animated.Value(10)
    }
  }

  handleAnimationOnPressItem = () => {

    const {height , margin} = this.state;
    const { onPressItem } = this.props;

    Animated.sequence([

      // makes deck element to grow a bit.
      Animated.parallel([
        Animated.spring(margin,
          {
            toValue: 30,
            speed: 5
          }
        ),
        Animated.spring(height,
          {
            toValue: 150,
            speed: 6
          }
        )
      ]),

      // this just makes sure the deck element shrink to the initial size after growing.
      Animated.parallel([
        Animated.spring(margin,
          {
            toValue: 10,
            speed: 4
          }
        ),
        Animated.spring(height,
          {
            toValue: 100,
            speed: 4
          }
        )
      ])

    ]).start();

    onPressItem()
  };

  render() {

     const { title, questionsNumber } = this.props;
     const {handleAnimationOnPressItem} = this;
     const {height, margin} = this.state;

    return (

      <TouchableOpacity
        onPress={handleAnimationOnPressItem}
      >
        <Animated.View style={[styles.card, styles.cardDimensions, styles.cardDirectionRow, {height, marginBottom: margin}]}>
          <Text style={styles.cardText}>
            {title}
          </Text>
          <View style={styles.numberOfCardsView}>
            <Text style={styles.numberOfCards}>
              {questionsNumber} { questionsNumber === 1 ? 'card' : 'cards'}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>

    )
  }

}

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
  containerEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0A1128',
  },
  warningCard: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEC69',
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: '#0A1128',
  },
  background:{
    backgroundColor: '#0A1128',
    flex: 1
  },
  card: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#DDF6FE',
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
     color: 'black',
     fontWeight: 'bold',
     padding: 20,
     borderRadius: 4,
     fontFamily: 'monospace',
     textAlign: 'left',
     opacity: 0.50,

  },
  numberOfCards: {
    color: '#0A1128',
    padding: 6,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    opacity: 0.75
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