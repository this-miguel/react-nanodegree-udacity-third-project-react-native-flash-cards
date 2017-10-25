import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDeck, getDecks, initializeDeckLibrary, saveDeck} from './utils/api'

export default class App extends React.Component {

  state = {
    data: 'no data yet',
    deck: 'no deck yet'
  };

  componentWillMount(){
    const testData = {helloDeck: {title: 'helloDeck'}} ;
    initializeDeckLibrary(testData)
    saveDeck('newDeck');
  }

  componentDidMount(){
    getDecks()
      .then(data => this.setState({data: data}));
    getDeck('newDeck')
      .then(data => this.setState({deck: data}))
  }

  render() {
    const {data, deck} = this.state;
    return (
      <View style={styles.container}>
        <Text>decks: {JSON.stringify(data)}</Text>
        <Text> a particular deck:  {JSON.stringify(deck)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
