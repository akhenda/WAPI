import React from 'react';
import { View, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { colors, images } from '../theme';
import styles from './styles/LoadingIndicatorStyles';


const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={colors.statusBarTranslucent} />
      <Animatable.Image
        source={images.logoWhite}
        style={styles.image}
        duration={2000}
        animation="pulse"
        easing="ease-in-out"
        iterationCount="infinite"
      />
      <Animatable.Text
        duration={4000}
        animation="flash"
        easing="ease-in-out"
        iterationCount="infinite"
        style={styles.loadingText}
      >
        LOADING
      </Animatable.Text>
    </View>
  );
};

export default LoadingIndicator;
