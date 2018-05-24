import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, BackHandler, PermissionsAndroid, Platform, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import Radar from 'react-native-radar';
import { Actions } from 'react-native-router-flux';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

import { updateLocation } from 'src/state/actions/app';
import { getCategories, selectCategory, clearListings } from 'src/state/actions/listings';
import SearchBar from 'src/components/SearchBar';
import Salutation from 'src/components/Salutation';
import CategoriesList from 'src/components/CategoriesList';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/HomeScreenStyles';


class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    let granted;
    this.props.getCategories(this.props.token);

    if (Platform.OS === 'android') {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: "<h2>Enable Location?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and Cell Network for location<br/><br/><a href='#'>Learn more</a>",
        ok: 'YES',
        cancel: 'NO',
        enableHighAccuracy: true, // true => GPS & NETWORK, false => GPS OR NETWORK PROVIDER
        showDialog: true, // false => Opens the Location access page directly
        openLocationServices: true,
        preventOutSideTouch: true,
        preventBackClick: false,
        providerListener: true,
      })
        .then(async () => {
          // success => {alreadyEnabled: true, enabled: true, status: 'enabled'}
          granted = await PermissionsAndroid
            .request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
              title: 'Geolocation Access',
              message: 'App needs access to your location ' +
              'so that we can let it be even more awesome.',
            });
        })
        .catch(() => {});
    }

    if ((granted || Platform.OS === 'ios') && this.props.user !== null) {
      // identify the user and request permissions
      const { user } = this.props;
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
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });

    DeviceEventEmitter.addListener('locationProviderStatusChange', (status) => {
      // only trigger when "providerListener" is enabled
      // console.tron.log(status);
      // status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
    });

    this.props.clearListings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories && nextProps.user) this.setState({ loading: false });
  }

  componentWillUnmount() {
    Radar.off('location');
    BackHandler.removeEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
  }

  onSelectCategory(id, name) {
    this.props.selectCategory(id, name);
    Actions.listings();
  }

  onSearch = (searchText) => {
    Actions.listings({ isSearch: true, searchText });
  }

  render() {
    const { user, categories } = this.props;
    const firstName = user ? user.first_name : 'Stranger 😃';

    if (this.state.loading) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          headerTitle="Discover"
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
  categories: PropTypes.array,
  clearListings: PropTypes.func,
  getCategories: PropTypes.func,
  selectCategory: PropTypes.func,
  updateLocation: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    categories: state.listings.categories,
  };
};

export default connect(mapStateToProps, {
  getCategories, selectCategory, updateLocation, clearListings,
})(HomeScreen);
