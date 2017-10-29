import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import help from '../utils/helpers'
import { Text, TextInput, View, TouchableOpacity } from 'react-native';

import {
  asyncNewDeck,
} from "../actions/AsyncActions";

class NewDeckDisconnected extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleSubmit = () => {
    const { navigation, newDeck } =  this.props;
    const { navigate } = navigation;
    newDeck(this.state.text);
    navigate('Home')
  };

  render(){

    const { text } = this.state;
    const {replaceWhiteSpaces} = help;
    const validDeckName = replaceWhiteSpaces(text).length !== 0    ;

    return(
      <View>
        <Text>Please enter the name of the new deck</Text>
        <TextInput
          onChangeText={(text) => this.setState({text})}
          value={text}
        />
        {
          validDeckName &&
          <TouchableOpacity
            onPress={this.handleSubmit}
          >
            <Text>
              Submit
            </Text>
          </TouchableOpacity>
        }

      </View>
    )
  }

}


NewDeckDisconnected.propTypes = {
  newDeck: PropTypes.func.isRequired,
};



function mapDispatchToProps(dispatch){
  return {
    newDeck:  asyncNewDeck(dispatch),
  }
}
const NewDeck = connect(
  null,
  mapDispatchToProps
)(NewDeckDisconnected);
export default NewDeck;