import { Constants } from 'expo'
import React from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

export default function SimpleStatusBar({backgroundColor, props}) {
  // This will basically be a wrapper for StatusBar to control the styling of it.
  // height property is taken from the Constants object offered by expo.
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent  backgroundColor={backgroundColor} { ...props } />
    </View>
  )
}
SimpleStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};