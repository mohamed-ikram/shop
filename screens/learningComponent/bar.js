import React from 'react';
import * as Progress from 'react-native-progress';
import * as ART from '@react-native-community/art';
import {View} from 'react-native';
import Fonts from '../../constants/Fonts';
const Bar = (props) => {
  return (
    <View>
      <Progress.Bar progress={0.3} width={200} />
      {/* <Progress.Pie progress={0.4} size={50} /> */}
      <View style={{width:70,transform: [{rotateZ: '90deg'}]}}>
      {/* <Progress.Circle  size={70} borderColor={"white"} progress={0.6} color={"red"} thickness={4} showsText unfilledColor={"#ccc"} textStyle={{color:"black",fontSize:16,transform: [{rotateZ: '270deg'}]}}  /> */}
      <Progress.Circle  size={60} borderColor={"white"} progress={0.2} color={"red"} thickness={4} showsText unfilledColor={"#ccc"} textStyle={{color:"black",transform: [{rotateZ: '270deg'}]}}  />
      </View>
      {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
    </View>
  );
};

export default Bar;
