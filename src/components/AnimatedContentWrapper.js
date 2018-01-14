import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image } from 'react-native';
import { Container, Text, Icon, Button } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import { metrics, colors, images } from 'src/theme';
import { getBackground } from 'src/utils/randomImages';

import styles from './styles/AnimatedContentWrapperStyles';


const HEADER_SCROLL_DISTANCE = metrics.headerMaxHeight - metrics.headerMinHeight;

class AnimatedContentWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = { scrollY: new Animated.Value(0) };
  }

  render() {
    const { children, bannerSource, headerTitle } = this.props;

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE + 50],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - 50],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-HEADER_SCROLL_DISTANCE, 0],
      outputRange: [3, 1],
      extrapolate: 'clamp',
    });

    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.9, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Container style={styles.container}>
        <Animated.View
          style={[
            styles.banner,
            {
              transform: [
                { translateY: headerTranslate },
                { scale: imageScale },
              ],
            },
          ]}
        >
          <Animated.Image
            source={bannerSource || getBackground()}
            style={[
              styles.bannerImage,
              {
                opacity: imageOpacity,
                transform: [
                  { translateY: imageTranslate },
                  { scale: imageScale },
                ],
              },
            ]}
          />
          <LinearGradient
            style={styles.linearGradient}
            colors={[
              'transparent',
              'transparent',
              'transparent',
              colors.primary.lightest,
              colors.primary.lightest,
            ]}
          />
          <Button rounded transparent style={styles.menuButton}>
            <Icon name="menu" style={styles.headerIcon} />
          </Button>
          <Image source={images.logoWhite} style={styles.logo} />
        </Animated.View>
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {children}
        </Animated.ScrollView>
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <Button rounded transparent style={styles.headerButton}>
            <Icon name="menu" style={styles.headerIcon} />
          </Button>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Button rounded transparent style={styles.headerButton}>
            <Icon name="ios-search" style={styles.headerIcon} />
          </Button>
        </Animated.View>
      </Container>
    );
  }
}

AnimatedContentWrapper.propTypes = {
  bannerSource: PropTypes.number,
  headerTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AnimatedContentWrapper;
