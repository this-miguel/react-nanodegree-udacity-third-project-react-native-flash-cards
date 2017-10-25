import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './utils/api'

export default class App extends React.Component {

  state = {
    data: 'no data yet',
    deck: 'no deck yet',
  };

  componentWillMount(){
    const sampleData = {
      helloDeck: {title: 'helloDeck'},
      testDeck: {
        title: 'testDeck',
        questions: []
      },
    } ;
    api.initializeDeckLibrary(sampleData);
    api.newDeck('newDeck');
    const testData = {
      title: 'testDeck',
      questions: [
        {
          question: 'is this data going to be preserved?',
          answer: 'Yes, it should be preserved.'
        }
      ]
    };
    api.updateDeck('testDeck', testData)
      .then( data => this.setState({data: data}) );

    const card = {
      question: 'is this going to work?',
      answer: 'Yes!, in the long run.'
    };
    api.addCard('testDeck', card)
      .then( data => this.setState({data: data}) )
  }

  componentDidMount(){
    api.getDeck('newDeck')
      .then(data => this.setState({deck: data}))
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
