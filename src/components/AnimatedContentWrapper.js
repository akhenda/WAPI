import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Image, ActivityIndicator, View } from 'react-native';
import { Container, Text, Icon, Button } from 'native-base';
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
  
  renderMenuButton(style, action, icon, iconStyle) {
    return (
      <Button rounded transparent style={style} onPress={action}>
        <Icon name={icon} style={iconStyle} />
      </Button>
    );
  }

  renderToolbarLeftButton() {
    const { headerButton, headerIcon, emptyButton } = styles;
    const { showToolbarLeftButton, menuLeftIcon, onLeftButton } = this.props;
  
    if (!showToolbarLeftButton) return <Button transparent style={emptyButton} />;

    return this.renderMenuButton(headerButton, onLeftButton, menuLeftIcon, headerIcon);
  }
  
  renderToolbarRightButton() {
    const { headerButton, headerIcon, emptyButton } = styles;
    const { showToolbarRightButton, menuRightIcon, onRightButton } = this.props;
  
    if (!showToolbarRightButton) return <Button transparent style={emptyButton} />;

    return this.renderMenuButton(headerButton, onRightButton, menuRightIcon, headerIcon);
  }
  
  renderBannerLeftButton() {
    const { leftButton, headerIcon } = styles;
    const { showBannerLeftButton, menuLeftIcon, onLeftButton } = this.props;
  
    if (showBannerLeftButton) {
      return this.renderMenuButton(leftButton, onLeftButton, menuLeftIcon, headerIcon);
    }
  }
  
  renderBannerRightButton() {
    const { rightButton, headerIcon } = styles;
    const { showBannerRightButton, menuRightIcon, onRightButton } = this.props;
  
    if (showBannerRightButton) {
      return this.renderMenuButton(rightButton, onRightButton, menuRightIcon, headerIcon);
    }
  }
  
  renderHeader() {
    const { headerTitle, opaqueHeader } = this.props;

    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE * 0.9, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.1, 1],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.header, { opacity: opaqueHeader ? 1 : headerOpacity }]}>
        {this.renderToolbarLeftButton()}
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        {this.renderToolbarRightButton()}
      </Animated.View>
    );
  }
  
  renderBanner() {
    const {
      showLogo, bannerSourceIsURI, bannerSource, linearGradient,
    } = this.props;

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

    return (
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
        <View style={styles.bannerImageLoading}>
          <ActivityIndicator size="large" color={colors.secondary.light} />
        </View>
        <Animated.Image
          source={bannerSourceIsURI ? { uri: bannerSource } : bannerSource || getBackground()}
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
      {linearGradient
        ? <LinearGradient
            style={styles.linearGradient}
            colors={[
              'transparent',
              'transparent',
              'transparent',
              colors.primary.lightest,
              colors.primary.lightest,
            ]}
          />
        : null}
        {this.renderBannerLeftButton()}
        {this.renderBannerRightButton()}
        {showLogo ? <Image source={images.logoWhite} style={styles.logo} /> : null}
      </Animated.View>
    );
  }

  render() {
    const { children, WrapperComponent } = this.props;

    return (
      <Container style={styles.container}>
        {this.renderBanner()}

        <WrapperComponent
          style={{ flex: 1 }}
          scrollEventThrottle={5}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {children}
        </WrapperComponent>

        {this.renderHeader()}
      </Container>
    );
  }
}

AnimatedContentWrapper.propTypes = {
  WrapperComponent: PropTypes.any,
  bannerSourceIsURI: PropTypes.bool,
  opaqueHeader: PropTypes.bool,
  showLogo: PropTypes.bool,
  onLeftButton: PropTypes.func,
  onRightButton: PropTypes.func,
  linearGradient: PropTypes.bool,
  menuLeftIcon: PropTypes.string,
  menuRightIcon: PropTypes.string,
  showBannerLeftButton: PropTypes.bool,
  showBannerRightButton: PropTypes.bool,
  showToolbarLeftButton: PropTypes.bool,
  showToolbarRightButton: PropTypes.bool,
  headerTitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  bannerSource: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

AnimatedContentWrapper.defaultProps = {
  showLogo: true,
  bannerSourceIsURI: false,
  opaqueHeader: false,
  linearGradient: true,
  menuLeftIcon: 'menu',
  menuRightIcon: 'search',
  showBannerLeftButton: true,
  showBannerRightButton: false,
  showToolbarLeftButton: true,
  showToolbarRightButton: true,
  WrapperComponent: Animated.ScrollView,
};

export default AnimatedContentWrapper;
