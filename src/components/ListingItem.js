import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
import StarRating from 'react-native-star-rating';

import { images, colors } from 'src/theme';

import styles from './styles/ListingItemStyles';

const ListingItem = (props) => {
  const { type, item } = props;
  const {
    title, address, rating, ratings, description, distance,
  } = item;
  if (type === 'large') {
    return (
      <View style={styles.large}>
        <Image source={images.favourites} style={styles.largeImage} />
        <View style={styles.largeImageMask} />
        <View style={styles.largeRating}>
          <Text style={styles.largeRatingValue}>{rating}</Text>
          <Icon name="ios-star" style={styles.largeRatingIcon} />
          <Text style={styles.largeRatingText}> | {ratings} Ratings</Text>
        </View>
        <TouchableOpacity style={styles.largeFavourite}>
          <Icon name="ios-heart-outline" style={styles.largeFavouriteIcon} />
        </TouchableOpacity>
        
        <View style={styles.largeContent}>
          <View style={styles.largeMeta}>
            <View style={styles.largeOpenStatus}>
              <Text style={styles.largeOpenStatusText}>OPEN NOW</Text>
            </View>
            <View style={styles.largeDistance}>
              <Icon name="ios-navigate-outline" style={styles.largeDistanceIcon} />
              <Text style={styles.largeDistanceText}>{distance} Km</Text>
            </View>
          </View>
          <Text style={styles.largeTitle}>{title}</Text>
          <View style={styles.largeAddress}>
            <Icon name="ios-pin-outline" style={styles.largeAddressIcon} />
            <Text style={styles.largeAddressText} numberOfLines={1}>{address}</Text>
          </View>
          <Text style={styles.largeDescription} numberOfLines={1}>{description}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.compact}>
      <View style={styles.compactImageContainer}>
        <Image source={images.medical} style={styles.compactImage} />
      </View>
      <View style={styles.compactContent}>
        <Text style={styles.compactTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.compactAddress}>
          <Icon name="ios-pin" style={styles.compactAddressIcon} />
          <Text style={styles.compactAddressText} numberOfLines={1}>{address}</Text>
        </View>
        <View style={styles.compactRating}>
          <StarRating
            disabled
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={rating}
            starSize={13}
            starColor={colors.secondary.light}
          />
          <Text style={styles.compactRatingText}> | {ratings} Ratings</Text>
        </View>
        <Text style={styles.compactDescription} numberOfLines={2}>{description}</Text>
        <View style={styles.compactDistance}>
          <Icon name="ios-navigate-outline" style={styles.compactDistanceIcon} />
          <Text style={styles.compactDistanceText}>{distance} Km</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.compactFavourite}>
        <Icon name="ios-heart-outline" style={styles.compactFavouriteIcon} />
      </TouchableOpacity>
    </View>
  );
};

ListingItem.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
};

ListingItem.defaultProps = {
  type: 'compact',
};

export default ListingItem;
