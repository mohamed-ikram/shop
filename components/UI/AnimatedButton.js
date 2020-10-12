import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const AnimatedButton = (props) => {
  // console.log(props);
  const [animatedWidth, setAnimatedWidth] = useState(
    new Animated.Value(props.initialValue.width),
  );
  const [animatedHeight, setAnimatedHeight] = useState(
    new Animated.Value(props.initialValue.height),
  );
  const [loading, setLoading] = useState(false);

  const animation = (width, height) => {
    Animated.timing(animatedWidth, {
      toValue: width,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const animatedBox = async () => {
    const stopAnimation = () => {
      animation(props.initialValue.width, props.initialValue.height);
      setLoading(false);
    };
    await animation(props.finalValue.width, props.finalValue.height);
    setLoading(true);
    if (props.validity) {
      props.submit();
      setTimeout(() => {
        stopAnimation();
      }, 1000);
    } else {
      alert('Enter e-mail and password correctly');
      setTimeout(() => {
        stopAnimation();
      }, 1000);
    }
  };
  const animatedStyle = {
    width: animatedWidth,
    height: animatedHeight,
    backgroundColor: props.bgColor,
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => animatedBox()}
      style={{
        marginVertical: 10,
      }}>
      <Animated.View style={[styles.box, animatedStyle]}>
        {loading ? (
          <ActivityIndicator color="white" size="large" />
        ) : (
          <Text
            style={{
              color: 'white',
              textTransform: 'uppercase',
              fontFamily: Fonts.bold,
              fontSize: 16,
            }}>
            {props.title}
          </Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 20,
  },
});
export default AnimatedButton;
