import React, {Component} from 'react';
import PropTypes from 'prop-types';
import  { connect } from 'react-redux'
import help from '../utils/helpers'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';

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
    const {replaceWhiteSpaces} = help;
    const {text} = this.state;

    newDeck(text)
      .then(({data}) => {
        const {title} = data;

        navigate('DeckMenu', { deckKey: replaceWhiteSpaces(title)})
      })
  };

  render(){

    const { text } = this.state;
    const {replaceWhiteSpaces} = help;
    const validDeckName = replaceWhiteSpaces(text).length !== 0    ;
    const {container, card, cardDimensions, cardText, button } = styles;
    return(
      <KeyboardAvoidingView behavior='padding' style={container}>
        <View >
          <View style={[card, cardDimensions]}>
            <Text style={cardText}>Please enter the name of the new deck below:</Text>
            <TextInput
              style={[ cardText, {width: 200} ]}
              onChangeText={(text) => this.setState({text})}
              value={text}
            />
          </View>
          {
            validDeckName &&
            <TouchableOpacity
              onPress={this.handleSubmit}
            >
              <Text style={button}>
                Save
              </Text>
            </TouchableOpacity>
          }
        </View>
      </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  container: {

    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#989898',

  },
  card: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d8dfe5',

  },
  cardDimensions: {

    width: 260,
    height: 260,
    borderRadius: 4,

  },
  cardText: {

    fontSize: 16,
    color: 'black',
    fontWeight: '300',
    padding: 20,
    borderRadius: 4,
    fontFamily: 'Roboto',
    textAlign: 'center',

  },
  button: {

    textAlign: 'center',
    backgroundColor: '#1a75ff',
    color: '#80b3ff',
    marginTop: 30,
    borderRadius: 4,
    padding: 6,
    marginRight: 8,
    marginLeft: 8,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'monospace',

  }
});