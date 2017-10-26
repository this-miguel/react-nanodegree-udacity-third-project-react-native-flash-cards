import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator} from 'react-navigation'
import store from './utils/store'
import  { Provider } from 'react-redux'
import DeckList from './components/DeckList'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Your Decks',
      // TODO: add tabBarIcon key
    }
  }
});

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Tabs/>
      </Provider>
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
