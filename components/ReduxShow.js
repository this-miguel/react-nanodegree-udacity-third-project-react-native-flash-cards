import React, {Component} from 'react';
import  { connect } from 'react-redux'
import { Text, View } from 'react-native';
import api from '../utils/api'
import {
  asyncNewDeck,
  asyncGetDecks,
  asyncAddCard,
  asyncUpdateDeck,
  asyncGetDeck
} from "../actions/AsyncActions";

class ReduxShow extends Component {

  componentWillMount(){
    /*
    //api.initializeDeckLibrary({});
    const {
      asyncNewDeck,
      asyncGetDecks,
      asyncUpdateDeck,
      asyncAddCard
    } = this.props;

    asyncNewDeck('testDeck1');


    const sampleData = {
        title: 'myNewDeck',
        questions: [
          {
            question: 'this works?',
            answer: 'yes',
          }
        ]
    };

    const testCard = {
      question: 'and this works?',
      answer: 'it should work, it should work also',
    };


    asyncAddCard('myNewDeck', testCard )
    asyncGetDeck('myNewDeck')
    */
  }
  componentDidMount(){
    /*
    const {
      asyncGetDecks,
      asyncGetDeck
    } = this.props;
    asyncGetDecks();
    */
  }

  render(){
    const {state} =  this.props;
    return(
      <View>
        <Text>
           redux state: {JSON.stringify(state, null, 2)}
        </Text>
      </View>
      )
  }

}

function mapStateToProps(state){
  return {
    state
  }
}

function mapDispatchToProps(dispatch){
  return {
    asyncNewDeck:   asyncNewDeck(dispatch),
    asyncGetDecks:  asyncGetDecks(dispatch),
    asyncGetDeck:   asyncGetDeck(dispatch),
    asyncAddCard:   asyncAddCard(dispatch),
    asyncUpdateDeck: asyncUpdateDeck(dispatch)
  }
}
ReduxShowConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxShow);
export default ReduxShowConnected;