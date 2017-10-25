import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import api from './utils/api'
import store from './utils/store'
import  { Provider } from 'react-redux'
import ReduxShowConnected from './components/ReduxShow'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <ReduxShowConnected/>
        </View>
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
