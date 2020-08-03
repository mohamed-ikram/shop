import React from 'react';
import {Image, View, Dimensions, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';

const images = [
  require('../../assets/images/banner_1.gif'),
  require('../../assets/images/banner_2.png'),
  require('../../assets/images/banner_3.gif'),
  require('../../assets/images/images.jpg'),
];

const CustomSlides = (props) => (
  <View style={styles.slide}>
    <Image resizeMode="stretch" style={styles.image} source={props.image} />
  </View>
);

const Banner = (props) => (
  <View style={styles.container}>
    <Swiper
      autoplay
      autoplayTimeout={5}
      dot={
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,.2)',
            width: 6,
            height: 6,
            borderRadius: 4,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      activeDot={
        <View
          style={{
            backgroundColor: Colors.accent,
            width: 10,
            height: 10,
            borderRadius: 6,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 3,
            marginBottom: 3,
          }}
        />
      }
      paginationStyle={{
        bottom: -23,
      }}
      loop>
      {images.map((image) => (
        <CustomSlides key={image} image={image} />
      ))}
    </Swiper>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.3,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 6,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});

export default Banner;
