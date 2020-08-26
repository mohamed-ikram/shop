import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import Colors from '../../constants/Colors';
const CustomHeaderButtons = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={props.iconSize}
      color={Platform.OS == 'android' ? 'white' : Colors.primary}
    />
  );
};
export default CustomHeaderButtons;
