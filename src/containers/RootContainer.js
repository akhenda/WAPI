import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Router, Scene, Drawer } from 'react-native-router-flux';
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

import DrawerContent from 'src/components/DrawerContent';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { isUserSignedIn } from 'src/state/actions/auth';

import { colors, metrics } from 'src/theme';
import styles from './styles/RootContainerStyles';

/* eslint-disable react/no-deprecated */
class RootContainer extends Component {
  componentDidMount() {
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
        <StatusBar translucent backgroundColor={colors.statusBarTranslucent} />
        <Router>
          <Scene key="root" navigationBarStyle={styles.header}>
            <Scene
              key="auth"
              hideNavBar
              initial={!authenticated}
              transitionConfig={
                () => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })
              }
            >
              <Scene key="login" title="Log In" component={LoginScreen} />
              <Scene key="signup" title="Sign Up" component={SignUpScreen} />
              <Scene initial={!introduced} key="intro" title="App Intro" component={WalkthroughScreen} />
            </Scene>
            <Drawer
              hideNavBar
              key="drawer"
              drawerWidth={metrics.screenWidth * 0.7}
              initial={authenticated}
              contentComponent={DrawerContent}
            >
              <Scene key="home" hideNavBar title="Home" component={HomeScreen} />
              <Scene key="listings" hideNavBar title="Listings" component={ListingsScreen} />
              <Scene key="listing" hideNavBar title="Listing" component={ListingDetailsScreen} />
              <Scene key="profile" hideNavBar title="Profile" component={ProfileScreen} />
              <Scene key="survey" hideNavBar initial={!surveyed} title="Survey" component={SurveyScreen} />
            </Drawer>
          </Scene>
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
