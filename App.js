import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDecks, initializeDeckLibrary} from './utils/api'

export default class App extends React.Component {

  state = {
    deckLibrary: 'no data yet'
  };

  componentWillMount(){
    const testData = {helloDeck: {title: 'helloDeck'}} ;
    initializeDeckLibrary(testData)
  }

  componentDidMount(){
     getDecks()
      .then(data => this.setState({deckLibrary: data}))
  }

  render() {
    const {deckLibrary} = this.state;
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(deckLibrary)}</Text>
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
