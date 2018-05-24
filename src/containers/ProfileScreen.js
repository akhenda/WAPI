import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Text, Tab, Tabs, Icon } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';
import { Actions } from 'react-native-router-flux';

import { images } from 'src/theme';
import LoadingIndicator from 'src/components/LoadingIndicator';
import styles from './styles/ProfileScreenStyles';


class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity key={item.id} style={styles.listingItemContainer}>
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
              {Object.keys(this.props.favourites).length > 0
                ? <View style={styles.listing}>
                    {Object.keys(this.props.favourites)
                      .map(item => this.renderItem(this.props.favourites[item]))}
                  </View>
                : this.renderEmpty('You have not saved any listing ¯\\_(ツ)_/¯')}
            </Tab>
            <Tab heading="My Listings">
              {this.renderEmpty('You do not have any listings on WAPI?')}
            </Tab>
            <Tab heading="Feed">
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
  favourites: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    favourites: state.app.favourites,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
