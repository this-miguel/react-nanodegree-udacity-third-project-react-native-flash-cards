import React, {Component} from 'react';
import  { connect } from 'react-redux'
import { Text, View } from 'react-native';
import {
  asyncNewDeck,
  asyncGetDecks,
  asyncAddCard,
  asyncUpdateDeck,
  asyncGetDeck
} from "../actions/AsyncActions";

class ReduxShow extends Component {

  componentWillMount(){

    const {
      asyncNewDeck,
      asyncGetDecks
    } = this.props;

    //asyncNewDeck('newTest');

  }
  componentDidMount(){
    const {
      asyncGetDecks
    } = this.props;
    asyncGetDecks();
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
    asyncNewDeck:  asyncNewDeck(dispatch),
    asyncGetDecks:  asyncGetDecks(dispatch)
  }
}
ReduxShowConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxShow);
export default ReduxShowConnected;