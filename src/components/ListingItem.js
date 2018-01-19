import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
import geodist from 'geodist';
import StarRating from 'react-native-star-rating';

import { colors } from 'src/theme';

import styles from './styles/ListingItemStyles';


/* eslint-disable camelcase */
const ListingItem = (props) => {
  const {
    type, item, location, isFavourite, onAddFavourite, onRemoveFavourite,
  } = props;
  const {
    title, listing_reviewed, listingpro, listing_rate, featured_image_url,
  } = item;
  const userLocation = { lat: location.latitude, lon: location.longitude };
  const listingLocation = { lat: listingpro.latitude, lon: listingpro.longitude };
  const distance = geodist(userLocation, listingLocation, { exact: true, unit: 'km' });
  const onFavourite = isFavourite ? () => onRemoveFavourite(item.id) : () => onAddFavourite(item);
  
  if (type === 'large') {
    return (
      <View style={styles.large}>
        <Image source={{ uri: featured_image_url[0] }} style={styles.largeImage} />
        <View style={styles.largeImageMask} />
        <View style={styles.largeRating}>
          <Text style={styles.largeRatingValue}>{listing_rate}</Text>
          <Icon name="ios-star" style={styles.largeRatingIcon} />
          <Text style={styles.largeRatingText}> | {listing_reviewed || '0'} Ratings</Text>
        </View>
        <TouchableOpacity style={styles.largeFavourite} onPress={onFavourite}>
          <Icon name={isFavourite ? 'ios-heart' : 'ios-heart-outline'} style={styles.largeFavouriteIcon} />
        </TouchableOpacity>
        
        <View style={styles.largeContent}>
          <View style={styles.largeMeta}>
            <View style={styles.largeOpenStatus}>
              <Text style={styles.largeOpenStatusText}>OPEN NOW</Text>
            </View>
            <View style={styles.largeDistance}>
              <Icon name="ios-navigate-outline" style={styles.largeDistanceIcon} />
              <Text style={styles.largeDistanceText}>{distance.toFixed(2)} Km</Text>
            </View>
          </View>
          <Text style={styles.largeTitle}>{title.rendered}</Text>
          {listingpro.gAddress
            ? <View style={styles.largeAddress}>
                <Icon name="ios-pin-outline" style={styles.largeAddressIcon} />
                <Text style={styles.largeAddressText} numberOfLines={1}>{listingpro.gAddress}</Text>
              </View>
            : null}
          <Text style={styles.largeDescription} numberOfLines={1}>{listingpro.tagline_text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.compact}>
      <View style={styles.compactImageContainer}>
        <Image source={{ uri: featured_image_url[0] }} style={styles.compactImage} />
      </View>
      <View style={styles.compactContent}>
        <Text style={styles.compactTitle} numberOfLines={1}>{title.rendered}</Text>
        {listingpro.gAddress
          ? <View style={styles.compactAddress}>
              <Icon name="ios-pin" style={styles.compactAddressIcon} />
              <Text style={styles.compactAddressText} numberOfLines={1}>{listingpro.gAddress}</Text>
            </View>
          : null}
        <View style={styles.compactRating}>
          <StarRating
            disabled
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={Number(listing_rate)}
            starSize={13}
            starColor={colors.secondary.light}
          />
          <Text style={styles.compactRatingText}> | {listing_reviewed || '0'} Ratings</Text>
        </View>
        <Text style={styles.compactDescription} numberOfLines={2}>{listingpro.tagline_text}</Text>
        <View style={styles.compactDistance}>
          <Icon name="ios-navigate-outline" style={styles.compactDistanceIcon} />
          <Text style={styles.compactDistanceText}>{distance.toFixed(2)} Km</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.compactFavourite} onPress={onFavourite}>
        <Icon name={isFavourite ? 'ios-heart' : 'ios-heart-outline'} style={styles.compactFavouriteIcon} />
      </TouchableOpacity>
    </View>
  );
};

ListingItem.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  location: PropTypes.object,
  isFavourite: PropTypes.bool,
  onAddFavourite: PropTypes.func,
  onRemoveFavourite: PropTypes.func,
};

ListingItem.defaultProps = {
  type: 'compact',
};

export default ListingItem;
