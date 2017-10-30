import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import store from './utils/store'
import  { Provider } from 'react-redux'
import DeckList from './components/DeckList'
import DeckMenu from './components/DeckMenu'
import DeckQuiz from './components/DeckQuiz'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Your Decks',
      // TODO: add tabBarIcon key
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      // TODO: add tabBarIcon key
    }
    //TODO: add navigation options to style the header
  }
},{
  navigationOptions: {
  header: null
  },
  tabBarOptions: {
    activeTintColor: 'white',
    style: {
      height: 56,
      backgroundColor: '#0A1128',
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  }
});

 const  MainNavigator = StackNavigator({
   Home:{
     screen: Tabs
   },
   DeckMenu: {
     screen: DeckMenu
     //TODO: add navigation options to style the header
   },
   DeckQuiz: {
     screen: DeckQuiz
     //TODO: add navigation options to style the header
   },
   AddCard: {
     screen: AddCard
     //TODO: add navigation options to style the header
   }

 });

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <MainNavigator/>
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
