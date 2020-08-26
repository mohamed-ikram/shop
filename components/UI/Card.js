import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = (props) => (
  <View style={{...styles.Card, ...props.styles}}>{props.children}</View>
);

const styles = StyleSheet.create({
  Card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default Card;
