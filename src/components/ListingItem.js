import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
import geodist from 'geodist';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import CacheableImage from 'react-native-cacheable-image';

import { openStatus } from 'src/utils/businessHours';

import { colors } from 'src/theme';
import styles from './styles/ListingItemStyles';


/* eslint-disable camelcase */
const ListingItem = (props) => {
  let distance = 0;
  const {
    type, item, location, isFavourite, onAddFavourite, onRemoveFavourite,
  } = props;
  const {
    title, listing_reviewed, listingpro, listing_rate, featured_image_url,
  } = item;
  const { isOpen } = openStatus(listingpro.business_hours);
  const onFavourite = isFavourite ? () => onRemoveFavourite(item.id) : () => onAddFavourite(item);

  if (location) {
    const userLocation = { lat: location.latitude, lon: location.longitude };
    const listingLocation = { lat: listingpro.latitude, lon: listingpro.longitude };
    distance = geodist(userLocation, listingLocation, { exact: true, unit: 'km' });
  }

  if (type === 'large') {
    return (
      <TouchableOpacity
        style={styles.large}
        onPress={() => Actions.listing({ item, onFavourite, isFavourite })}
      >
        <CacheableImage style={styles.largeImage} source={{ uri: featured_image_url[0] }} />
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
              <Text style={styles.largeOpenStatusText}>{isOpen ? 'OPEN' : 'CLOSED'} NOW</Text>
            </View>
            {distance > 0
              ? <View style={styles.largeDistance}>
                  <Icon name="ios-navigate-outline" style={styles.largeDistanceIcon} />
                  <Text style={styles.largeDistanceText}>{distance.toFixed(2)} Km</Text>
                </View>
              : null}
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
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.compact}
      onPress={() => Actions.listing({ item, onFavourite, isFavourite })}
    >
      <View style={styles.compactImageContainer}>
        <CacheableImage style={styles.compactImage} source={{ uri: featured_image_url[0] }} />
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
        {distance > 0
          ? <View style={styles.compactDistance}>
              <Icon name="ios-navigate-outline" style={styles.compactDistanceIcon} />
              <Text style={styles.compactDistanceText}>{distance.toFixed(2)} Km</Text>
            </View>
          : null}
      </View>
      <TouchableOpacity style={styles.compactFavourite} onPress={onFavourite}>
        <Icon name={isFavourite ? 'ios-heart' : 'ios-heart-outline'} style={styles.compactFavouriteIcon} />
      </TouchableOpacity>
    </TouchableOpacity>
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
