import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

import { updateLocation } from 'src/state/actions/app';
import { getCategories, selectCategory } from 'src/state/actions/listings';
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
      isRunning: false,
    };
  }
  
  componentWillMount() {
    this.props.getCategories(this.props.token);
  }
  
  componentDidMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: 10,
      stationaryRadius: 50,
      distanceFilter: 50,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
    });
    
    BackgroundGeolocation.on('start', () => {
      console.tron.log('[DEBUG] BackgroundGeolocation has been started');
      this.setState({ isRunning: true });
    });

    BackgroundGeolocation.on('stop', () => {
      console.tron.log('[DEBUG] BackgroundGeolocation has been stopped');
      this.setState({ isRunning: false });
    });

    BackgroundGeolocation.on('authorization', (status) => {
      if (status !== BackgroundGeolocation.auth.AUTHORIZED) {
        Alert.alert(
          'Location services are disabled',
          'Would you like to open location settings?',
          [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showLocationSettings() },
            { text: 'No', onPress: () => console.tron.log('No Pressed'), style: 'cancel' },
          ],
        );
      }
    });
    
    BackgroundGeolocation.on('error', ({ message }) => {
      Alert.alert('BackgroundGeolocation error', message);
    });

    BackgroundGeolocation.on('location', (location) => {
      console.tron.log(location);

      BackgroundGeolocation.startTask((taskKey) => {
        requestAnimationFrame(() => {
          this.props.updateLocation(location);

          BackgroundGeolocation.endTask(taskKey);
        });
      });
    });
    
    BackgroundGeolocation.on('foreground', () => {
      console.tron.log('[INFO] App is in foreground');
    });
    
    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      this.setState({ isRunning });
    });
    
    BackgroundGeolocation.start();
  }
  
  componentWillUnmount() {
    BackgroundGeolocation.events.forEach((event) => {
      BackgroundGeolocation.removeAllListeners(event);
    });
  }
  
  onSelectCategory(id, name) {
    this.props.selectCategory(id, name);
    Actions.listings();
  }

  render() {
    const { user, categories } = this.props;

    if (user === null || categories.length === 0) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          headerTitle="Discover"
          onLeftButton={Actions.drawerOpen}
        >
          <View style={styles.content}>
            <Salutation name={user.first_name || 'Stranger 😃'} />
            <SearchBar />
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
  getCategories, selectCategory, updateLocation,
})(HomeScreen);
