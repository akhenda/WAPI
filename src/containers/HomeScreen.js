import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import Radar from 'react-native-radar';
import { Actions } from 'react-native-router-flux';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {
  View, PermissionsAndroid, Platform, StatusBar,
} from 'react-native';

import SearchBar from 'src/components/SearchBar';
import Salutation from 'src/components/Salutation';
import shallowCompare from 'src/utils/shallowCompare';
import { updateLocation } from 'src/state/actions/app';
import CategoriesList from 'src/components/CategoriesList';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';
import { getCategories, selectCategory, clearListings } from 'src/state/actions/listings';

import { colors } from 'src/theme';
import styles from './styles/HomeScreenStyles';


/* eslint-disable camelcase */
/* eslint-disable react/no-deprecated */
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    let granted;
    const { user, loading, catLoading } = this.props;

    this.props.getCategories(this.props.token);

    if (!loading && !catLoading) {
      const locationSetup = () => {
        // identify the user and request permissions
        const description = user.name || user.username;

        Radar.setUserId(String(user.id));
        Radar.setDescription(description);
        Radar.requestPermissions(false);

        // track the user's location once in the foreground
        Radar.trackOnce().then((result) => {
          // do something with result.events, result.user.geofences
          this.props.updateLocation(result.location);
        }).catch(() => {
          // optionally, do something with err
        });

        Radar.on('location', (result) => {
          this.props.updateLocation(result.location);
        });
      };

      if (Platform.OS === 'android') {
        RNAndroidLocationEnabler
          .promptForEnableLocationIfNeeded({ interval: 7000, fastInterval: 3000 })
          .then(async () => {
            // success => {alreadyEnabled: true, enabled: true, status: 'enabled'}
            granted = await PermissionsAndroid
              .request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'WAPI? App needs to access your location 📌',
                message: 'We need to access to your location '
                + 'so that we can personalize your experience. 🙂',
              });
            if (granted && Object.keys(this.props.user).length > 0) locationSetup();
          }).catch(() => {});
      }

      if (Platform.OS === 'ios' && Object.keys(this.props.user).length > 0) locationSetup();
    }

    this.props.clearListings();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.tron.display({
    //   name: '🔥 HomeScreen Container Component 🔥',
    //   preview: 'Should our component update? 🤷‍',
    //   value: {
    //     this_props: this.props,
    //     next_props: nextProps,
    //     this_state: this.state,
    //     next_state: nextState,
    //     so_should_it_update: shallowCompare(this, nextProps, nextState),
    //   },
    // });
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    Radar.off('location');
  }

  onSelectCategory(id, name) {
    this.props.selectCategory(id, name);
    Actions.listings({ isSearch: false });
  }

  onSearch = (searchText) => {
    Actions.listings({ isSearch: true, searchText });
  }

  render() {
    const {
      user, loading, catLoading, categories, authenticated,
    } = this.props;
    const firstName = Object.keys(user).length > 0 ? user.first_name : 'Stranger 😃';

    if (Object.keys(user).length === 0 && !authenticated) Actions.login();

    if (loading || catLoading) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor={colors.statusBarTranslucent} />
        <AnimatedContentWrapper
          headerTitle="Discover"
          showToolbarRightButton={false}
          onLeftButton={Actions.drawerOpen}
        >
          <View style={styles.content}>
            <Salutation name={firstName} />
            <SearchBar onSearch={this.onSearch} />
            <CategoriesList
              categories={categories}
              onSelectCategory={(id, name) => this.onSelectCategory(id, name)}
            />
          </View>
        </AnimatedContentWrapper>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  loading: PropTypes.bool,
  catLoading: PropTypes.bool,
  categories: PropTypes.array,
  authenticated: PropTypes.bool,
  clearListings: PropTypes.func,
  getCategories: PropTypes.func,
  selectCategory: PropTypes.func,
  updateLocation: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.auth.loading,
    catLoading: state.listings.loading,
    categories: state.listings.categories,
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, {
  getCategories, selectCategory, updateLocation, clearListings,
})(HomeScreen);
