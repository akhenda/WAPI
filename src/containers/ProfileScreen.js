import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import CacheableImage from 'react-native-cacheable-image';
import {
  View, Image, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {
  Container, Content, Button, Text, Tab, Tabs, Icon,
} from 'native-base';

import { images } from 'src/theme';
import { getUserListings, getFavouriteListings } from 'src/state/actions/listings';
import LoadingIndicator from 'src/components/LoadingIndicator';
import styles from './styles/ProfileScreenStyles';

/* eslint-disable react/no-deprecated */
class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchUserListings();
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  fetchUserListings = () => {
    const { token, user } = this.props;

    if (Object.keys(user).length > 0) {
      this.setState({ loading: true });
      this.props.getUserListings(token, user.id);

      if (this.props.favourites.length > 0) {
        const ids = this.props.favourites.reduce((args, id) => `${args}include[]=${id}&`, '').slice(0, -1);
        this.props.getFavouriteListings(token, ids);
      }
    }
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.listingItemContainer}
        onPress={() => Actions.listing({ id: item.id, onLeftButton: Actions.profile })}
      >
        <View style={styles.listingItemLoading}>
          <ActivityIndicator size="small" />
        </View>
        <CacheableImage
          resizeMode="cover"
          style={styles.listingItem}
          source={{ uri: item.featured_image_url[0] }}
        />
        <View style={styles.listingItemTextContainer}>
          <Text style={styles.listingItemText}>{item.title.rendered}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderEmpty(message) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  }

  render() {
    const { user } = this.props;
    if (this.state.loading) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <Content bounces={false} style={styles.content}>
          <View style={styles.headerBanner}>
            <Image source={images.wapiBackround} style={styles.banner} />
            <View style={styles.backgroundMask} />
            <Image source={{ uri: user.avatar_urls['96'] }} style={styles.avatar} />
            <Button transparent style={styles.leftMenuButton} onPress={Actions.pop}>
              <Icon name='arrow-back' style={styles.menuButton} />
            </Button>
            {/* <Button transparent style={styles.rightMenuButton}>
              <Icon name='create' style={styles.menuButton} />
            </Button> */}
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{(user.name || user.username).toUpperCase()}</Text>
            <Text style={styles.bio}>
              {user.description || '~ Use the online portal to update your bio ~'}
            </Text>
            <View style={styles.spacer10} />
            <Button rounded light bordered small style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Button>
            <View style={styles.spacer20} />
          </View>
          <Tabs initialPage={0}>
            <Tab heading="Favourites">
              {this.props.favPlaces.length > 0
                ? <View style={styles.listing}>
                    {this.props.favPlaces.map(item => this.renderItem(item))}
                  </View>
                : this.renderEmpty('You have not saved any listing ¯\\_(ツ)_/¯')}
            </Tab>
            <Tab heading="My Listings">
              {Object.keys(this.props.places).length > 0
                ? <View style={styles.listing}>
                    {this.props.places.map(item => this.renderItem(item))}
                  </View>
                : this.renderEmpty('You do not have any listings on WAPI? ¯\\_(ツ)_/¯')}
            </Tab>
            <Tab heading="My Reviews">
              {this.renderEmpty('Feature coming soon...')}
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

ProfileScreen.propTypes = {
  user: PropTypes.object,
  places: PropTypes.array,
  token: PropTypes.string,
  favPlaces: PropTypes.array,
  favourites: PropTypes.array,
  getUserListings: PropTypes.func,
  getFavouriteListings: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    places: state.listings.places,
    favourites: state.app.favourites,
    favPlaces: state.listings.favourites,
  };
};

export default connect(mapStateToProps, { getUserListings, getFavouriteListings })(ProfileScreen);
