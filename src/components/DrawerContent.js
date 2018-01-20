import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Content, Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { images } from 'src/theme';
import { selectCategory } from 'src/state/actions/listings';
import styles from './styles/DrawerContentStyles';

class DrawerContent extends Component {
  onSelectCategory(id, name) {
    this.props.selectCategory(id, name);
    Actions.listings();
  }

  renderMenuItem(icon, action, title, color, style) {
    return (
      <TouchableOpacity key={icon} onPress={action} style={[styles.menuItem, style]}>
        <Icon name={icon} style={[styles.menuItemIcon, { color }]} />
        <Text style={styles.menuItemText}>{title}</Text>
      </TouchableOpacity>
    );
  }
  
  renderCategories() {
    if (this.props.categories.length > 0) {
      return this.props.categories.map((category) => {
        let iconName = 'walk';
        let iconColor = 'orange';
        const name = category.name.toLowerCase();
        if (name.indexOf('restaurants') >= 0) {
          iconName = 'restaurant';
          iconColor = 'darkblue';
        } else if (name.indexOf('medical') >= 0) {
          iconName = 'medkit';
          iconColor = 'green';
        } else if (name.indexOf('services') >= 0) {
          iconName = 'pricetags';
          iconColor = 'darkslategrey';
        } else if (name.indexOf('shopping') >= 0) {
          iconName = 'cart';
          iconColor = 'deepskyblue';
        } else if (name.indexOf('volunteering') >= 0) {
          iconName = 'hand';
          iconColor = 'fuchsia';
        }

        return this.renderMenuItem(
          iconName,
          () => this.onSelectCategory(category.id, category.name),
          category.name.split(' ')[0],
          iconColor,
        );
      });
    }
  }

  render() {
    const { user } = this.props;

    // TODO: render the user details after we get the user object because
    // when the RootContainer loads at first the user object is null
    if (!user) return <View />;

    return (
      <Content
        bounces={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.banner}>
          <Image source={images.wapiBackround2} style={styles.bannerImage} />
          <View style={styles.bannerMask} />
          {user.first_name && user.last_name
            ? <Text style={[styles.name, styles.fullName]}>{user.first_name}{'\n'}{user.last_name}</Text>
            : <Text style={[styles.name, styles.singleName]}>{user.name || user.username}</Text>}
          <Button bordered light small style={styles.profileButton} onPress={Actions.profile}>
            <Text style={styles.profileButtonText}>Profile</Text>
          </Button>
        </View>
        <Image source={{ uri: user.avatar_urls['96'] }} style={styles.avatar} />
        <View style={styles.menuItems}>
          {this.renderMenuItem('home', Actions.home, 'Home', 'blue')}
          {this.renderCategories()}
          {this.renderMenuItem('settings', Actions.home, 'Settings', 'black', styles.lastMenuItem)}
        </View>
        <TouchableOpacity style={styles.signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </Content>
    );
  }
}

DrawerContent.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  categories: PropTypes.array,
  selectCategory: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    categories: state.listings.categories,
  };
};

export default connect(mapStateToProps, { selectCategory })(DrawerContent);
