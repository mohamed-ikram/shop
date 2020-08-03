import React from 'react';
import {View, Text, Button} from 'react-native';

const Super = (props) => (
  <View>
    <Text>working</Text>
    <Button title="click" onPress={()=>props.navigation.navigate("HomePage")} />
  </View>
);

export default Super;
