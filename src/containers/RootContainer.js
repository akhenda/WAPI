import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  Scene, Router, Overlay, Modal, Drawer, Stack, Lightbox,
} from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import WalkthroughScreen from 'src/containers/WalkthroughScreen';
import LoginScreen from 'src/containers/LoginScreen';
import SignUpScreen from 'src/containers/SignUpScreen';
import SurveyScreen from 'src/containers/SurveyScreen';
import HomeScreen from 'src/containers/HomeScreen';
import ProfileScreen from 'src/containers/ProfileScreen';
import ListingsScreen from 'src/containers/ListingsScreen';
import EditProfileScreen from 'src/containers/EditProfileScreen';
import ListingDetailsScreen from 'src/containers/ListingDetailsScreen';
import ListingReviewsScreen from 'src/containers/ListingReviewsScreen';
import FormModalScreen from 'src/containers/FormModalScreen';

import DrawerContent from 'src/components/DrawerContent';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { isUserSignedIn } from 'src/state/actions/auth';

import { colors, metrics } from 'src/theme';
import styles from './styles/RootContainerStyles';


const getSceneStyle = () => ({
  backgroundColor: colors.primary.steel,
  shadowOpacity: 1,
  shadowRadius: 3,
});

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'wapi://wapi/' : 'wapi://';

/* eslint-disable react/no-deprecated */
class RootContainer extends Component {
  componentWillMount() {
    this.props.isUserSignedIn(this.props.token);
  }

  render() {
    const {
      loading,
      surveyed,
      introduced,
      authenticated,
    } = this.props;

    if (loading && !authenticated) return <LoadingIndicator />;

    return (
      <View style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor={colors.statusBarTranslucent} />
        <Router getSceneStyle={getSceneStyle} uriPrefix={prefix}>
          <Overlay key="overlay">
            <Modal
              key="modal"
              titleStyle={styles.headerTitle}
              navigationBarStyle={styles.header}
              backButtonTintColor={colors.primary.text}
              rightButtonTextStyle={styles.headerTitle}
              transitionConfig={
                () => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })
              }
            >
              <Lightbox hideNavBar key="lightbox">
                <Stack hideNavBar key="root" titleStyle={{ alignSelf: 'center' }}>
                  <Stack
                    back
                    key="auth"
                    hideNavBar
                    duration={0}
                    navTransparent
                    backTitle="Back"
                    initial={!authenticated}
                  >
                    <Scene key="login" title="Log In" component={LoginScreen} />
                    <Scene key="signup" title="Sign Up" component={SignUpScreen} />
                    <Scene initial={!introduced} key="intro" title="App Intro" component={WalkthroughScreen} />
                  </Stack>
                  <Drawer
                    hideNavBar
                    key="drawer"
                    initial={authenticated}
                    contentComponent={DrawerContent}
                    drawerWidth={metrics.screenWidth * 0.7}
                  >
                    <Stack
                      hideNavBar
                      key="mainStack"
                      titleStyle={styles.headerTitle}
                      transitionConfig={
                        () => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })
                      }
                    >
                      <Scene key="home" title="Home" component={HomeScreen} />
                      <Scene key="listings" title="Listings" component={ListingsScreen} />
                      <Scene key="listing" title="Listing" component={ListingDetailsScreen} />
                      <Scene key="profile" title="Profile" component={ProfileScreen} />
                      <Scene key="survey" initial={!surveyed} title="Survey" component={SurveyScreen} />
                      <Scene
                        back
                        key="editProfile"
                        hideNavBar={false}
                        title="Edit Profile"
                        component={EditProfileScreen}
                      />
                    </Stack>
                  </Drawer>
                </Stack>
              </Lightbox>
              <Scene back modal key="formModal" rightTitle="Save" component={FormModalScreen} />
              <Scene back modal title="Reviews" key="reviewsModal" component={ListingReviewsScreen} />
            </Modal>
          </Overlay>
        </Router>
      </View>
    );
  }
}

RootContainer.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  loading: PropTypes.bool,
  surveyed: PropTypes.bool,
  introduced: PropTypes.bool,
  authenticated: PropTypes.bool,
  isUserSignedIn: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.auth.loading,
    surveyed: state.app.surveyed,
    introduced: state.app.introduced,
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { isUserSignedIn })(RootContainer);
