import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './utils/api'

export default class App extends React.Component {

  state = {
    data: 'no data yet',
    deck: 'no deck yet',
  };

  componentWillMount(){
    const testData = {
      helloDeck: {title: 'helloDeck'},
      textDeck: {title: 'testDeck'},
    } ;
    api.initializeDeckLibrary(testData);
    api.newDeck('newDeck');
  }

  componentDidMount(){
    api.getDeck('newDeck')
      .then(data => this.setState({deck: data}))
    const testData = {
      title: 'testDeck',
      data: 'some data'
    };
    api.updateDeck('testDeck', testData);
    api.getDecks()
      .then(data => this.setState({data: data}));
  }


  render() {
    const {data, deck} = this.state;
    return (
      <View style={styles.container}>
        <Text>decks: {JSON.stringify(data, null, 2)}</Text>
        <Text> a particular deck:  {JSON.stringify(deck, null, 2)}</Text>
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
