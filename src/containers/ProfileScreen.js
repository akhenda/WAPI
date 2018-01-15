import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Button, Text, Tab, Tabs, Icon } from 'native-base';

import { images } from 'src/theme';
import LoadingIndicator from 'src/components/LoadingIndicator';
import styles from './styles/ProfileScreenStyles';


class ProfileScreen extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 4,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 5,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 7,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 10,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
      ],
      loading: false,
    };
  }

  renderItem = (item) => {
    return <Image key={item.id} style={styles.listingItem} source={images.activities} />;
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
            <Image source={images.avatar} style={styles.avatar} />
            <Button transparent style={styles.leftMenuButton}>
              <Icon name='arrow-back' style={styles.menuButton} />
            </Button>
            <Button transparent style={styles.rightMenuButton}>
              <Icon name='create' style={styles.menuButton} />
            </Button>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{(user.name || user.username).toUpperCase()}</Text>
            <Text style={styles.bio}>
              Joseph Akhenda is a Software Developer vizii.
              Au sio? Joseph Akhenda is a Software Developer
            </Text>
            <Button rounded light bordered small style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </Button>
          </View>
          <Tabs initialPage={0}>
            <Tab heading="Favourites">
              {this.state.data.length > 0
                ? <View style={styles.listing}>
                    {this.state.data.map(item => this.renderItem(item))}
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
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
