import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import ViewMoreText from 'react-native-view-more-text';
import ImageViewer from 'react-native-image-zoom-viewer';
import GoogleStaticMap from 'react-native-google-static-map';
import { web, phonecall, email } from 'react-native-communications';
import {
  View, FlatList, TouchableOpacity, ActivityIndicator, Modal, Platform, Share, Linking, Alert,
} from 'react-native';
import {
  Container, Text, Fab, Icon,
} from 'native-base';
import FastImage from 'react-native-fast-image';

import { stripHTML } from 'src/utils/strip';
import returnValidURL from 'src/utils/validURL';
import { openStatus } from 'src/utils/businessHours';
import shallowCompare, { shallowEqual } from 'src/utils/shallowCompare';
import ActivitySpinner from 'src/components/ActivitySpinner';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { addFavourite, removeFavourite } from 'src/state/actions/app';
import { getListing, getListingReviews } from 'src/state/actions/listings';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import { colors, metrics } from 'src/theme';
import styles from './styles/ListingDetailsScreenStyles';


/* eslint-disable camelcase */
/* eslint-disable react/no-deprecated */
class ListingDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      loading: true,
      imageIndex: 0,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchListing();
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.item, this.props.item)) {
      const { token } = nextProps;
      const { reviews_url } = nextProps.item;

      this.setState({ loading: false }, () => {
        if (reviews_url) this.props.getListingReviews(token, reviews_url);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  fetchListing = () => {
    const { token, id } = this.props;

    this.setState({ loading: true });
    this.props.getListing(token, id);
  }

  toggleModal = (index = 0) => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible, imageIndex: index }));
  }

  sendEmail = (listingEmail) => {
    email([listingEmail], ['info@wapi-kenya.com'], null, 'Listing Enquiry', 'Hello,\n\n I would like to get more information about your establishment listed on WAPI? Kenya.');
  }

  onShare = () => {
    const { title, link, listingpro } = this.props.item;

    return Share.share(
      {
        message: `Hey 😃! Check out ${title.rendered}.\n\n${listingpro.tagline_text}\n\n${link}`,
        title: `Check out ${title.rendered} on WAPI? Kenya.`,
        url: link,
      }, {
        subject: `Check out ${title.rendered} on WAPI? Kenya.`,
        dialogTitle: `Check out ${title.rendered} on WAPI? Kenya.`,
      },
    );
  }

  onNavigateTo = () => {
    const { listingpro } = this.props.item;
    const { latitude, longitude } = listingpro;
    const toLatitude = latitude === '' ? '0.0' : latitude;
    const toLongitude = longitude === '' ? '0.0' : longitude;
    const { latitude: fromLatitude, longitude: fromLongitude } = this.props.currentLocation;
    let url = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&';
    url += `origin=${fromLatitude},${fromLongitude}&`;
    url += `destination=${toLatitude},${toLongitude}`;

    Linking
      .canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Install Google Maps to use our navigation feature');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => {
        // shhh!!!
      });
  }

  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={styles.readMore}>Read more</Text>
    );
  }

  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={styles.readMore}>Show less</Text>
    );
  }

  render() {
    const { loading, imageIndex, modalVisible } = this.state;

    if (loading) return <LoadingIndicator />;

    const {
      id,
      title,
      content,
      listingpro,
      listing_rate,
      gallery_images,
      listing_reviewed,
      featured_image_url,
    } = this.props.item;
    const isFavourite = this.props.favourites.includes(id);
    const { isOpen } = openStatus(listingpro.business_hours);
    let onFavourite = () => this.props.addFavourite(this.props.item.id);

    const gallery = gallery_images.map(img => ({ url: img[0] }));

    if (isFavourite) {
      onFavourite = () => this.props.removeFavourite(this.props.item.id);
    }

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          showLogo={false}
          bannerSourceIsURI
          linearGradient={false}
          menuRightIcon="md-map"
          menuLeftIcon="arrow-back"
          onLeftButton={this.props.onLeftButton}
          headerTitle={title.rendered}
          showToolbarRightButton={false}
          bannerSource={featured_image_url[0]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title.rendered}</Text>
          </View>
          <View style={styles.content}>
            <View style={[styles.dropShadow, styles.contacts]}>
              <View
                style={[
                  styles.openStatus,
                  !isOpen ? { backgroundColor: colors.secondary.dark } : null,
                ]}
              >
                <Text style={styles.openStatusText}>{isOpen ? 'OPEN' : 'CLOSED'} NOW</Text>
              </View>
              <View style={styles.contactsTopSpacer} />
              {listingpro.gAddress
                ? <TouchableOpacity
                    style={[styles.contactItem, styles.address]}
                    onPress={this.onNavigateTo}
                  >
                    <Text style={styles.addressText} numberOfLines={2}>{listingpro.gAddress}</Text>
                    <Icon name="pin" style={styles.addressIcon} />
                  </TouchableOpacity>
                : null}
              {listingpro.phone
                ? <TouchableOpacity
                    style={[styles.contactItem, styles.phone]}
                    onPress={() => phonecall(listingpro.phone.replace(/[^\w+/()]/g, '').split(/[,/|]+/)[0], true)}
                  >
                    <Text style={styles.phoneText} numberOfLines={1}>{listingpro.phone}</Text>
                    <Icon name="call" style={styles.phoneIcon} />
                  </TouchableOpacity>
                : null}
              {listingpro.email
                ? <TouchableOpacity
                    style={[styles.contactItem, styles.email]}
                    onPress={() => this.sendEmail(listingpro.email)}
                  >
                    <Text style={styles.emailText} numberOfLines={1}>{listingpro.email}</Text>
                    <Icon name="at" style={styles.emailIcon} />
                  </TouchableOpacity>
                : null}
              {listingpro.website
                ? <TouchableOpacity
                    style={[styles.contactItem, styles.website]}
                    onPress={() => web(returnValidURL(listingpro.website))}
                  >
                    <Text style={styles.websiteText} numberOfLines={1}>{listingpro.website}</Text>
                    <Icon name="globe" style={styles.websiteIcon} />
                  </TouchableOpacity>
                : null}
            </View>

            {gallery_images.length > 0
              ? <FlatList
                  horizontal
                  data={gallery_images}
                  keyExtractor={item => item[0]}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.toggleModal(index)}
                        style={Platform.OS === 'ios' ? styles.galleryItemContainer : null}
                      >
                        <FastImage style={styles.galleryItem} source={{ uri: item[0] }} />
                      </TouchableOpacity>
                    );
                  }}
                  style={[styles.gallery]}
                />
              : null}

            <View style={[styles.dropShadow, styles.moreInfo]}>
              <View style={styles.verified}>
                <Icon name="thumbs-up" style={styles.verifiedIcon} />
                <Text style={styles.verifiedText}>Verified by WAPI?</Text>
              </View>
              <Text style={[styles.titles, styles.moreInfoTitle]}>Description</Text>
              <ViewMoreText
                numberOfLines={8}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
              >
                <Text style={styles.description}>{stripHTML(content.rendered)}</Text>
              </ViewMoreText>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={Actions.reviewsModal}
              style={[styles.dropShadow, styles.reviews]}
            >
              <Text style={[styles.titles, styles.reviewsTitle]}>
                {Number(listing_rate) === 0
                  ? 'Be the first one to leave a review 🌟'
                  : 'How others rate this place'}
              </Text>
              <View style={styles.ratings}>
                <View style={styles.ratingsValueContainer}>
                  <Text style={styles.ratingsValue}>{listing_rate || '0.0'}</Text>
                </View>
                <View style={styles.starsContainer}>
                  <View style={styles.stars}>
                    <StarRating
                      disabled
                      maxStars={5}
                      starSize={18}
                      iconSet={'Ionicons'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      emptyStar={'ios-star-outline'}
                      rating={Number(listing_rate) || 0}
                      starColor={colors.secondary.light}
                      fullStarColor={colors.primary.main}
                    />
                  </View>
                <Text style={styles.totalReviews}>{listing_reviewed || 0} Reviews</Text>
                </View>
              </View>
            </TouchableOpacity>

            {listingpro.latitude !== ''
              ? <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onNavigateTo}
                  style={[styles.dropShadow, styles.mapContainer]}
                >
                  <View style={styles.mapLoading}>
                    <ActivityIndicator size="large" color={colors.secondary.light} />
                  </View>
                  <GoogleStaticMap
                    style={styles.map}
                    latitude={String(listingpro.latitude) || '0.0'}
                    longitude={String(listingpro.longitude) || '0.0'}
                    zoom={13}
                    size={{ width: metrics.screenWidth, height: 220 }}
                    apiKey={Config.GOOGLE_MAPS_API_KEY}
                  />
                </TouchableOpacity>
              : null}

            {listingpro.business_hours
              ? <View style={[styles.dropShadow, styles.businessHours]}>
                  <Text style={[styles.titles, styles.businessHoursTitle]}>Business Hours</Text>
                  <View style={styles.businessHoursContent}>
                    <View style={styles.businessHoursContentRow}>
                      <Text style={styles.businessHoursContentDay} />
                      <Text style={styles.businessHoursContentTitle}>Opening</Text>
                      <Text style={styles.businessHoursContentTitle}>Closing</Text>
                    </View>
                    {Object.keys(listingpro.business_hours).map((day) => {
                      return (
                        <View key={day} style={styles.businessHoursContentRow}>
                          <Text style={styles.businessHoursContentDay}>{day}</Text>
                          <Text style={styles.businessHoursContentTime}>
                            {listingpro.business_hours[day].open}
                          </Text>
                          <Text style={styles.businessHoursContentTime}>
                            {listingpro.business_hours[day].close}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              : null}
          </View>
          <Fab active position="topRight" onPress={onFavourite} style={styles.favouriteFab}>
            <Icon name={isFavourite ? 'ios-heart' : 'ios-heart-outline'} />
          </Fab>
          <Fab active position="topRight" onPress={this.onShare} style={styles.shareFab}>
            <Icon name="md-share" />
          </Fab>
        </AnimatedContentWrapper>
        <Modal visible={modalVisible} transparent={true} onRequestClose={this.toggleModal}>
          <ImageViewer
            index={imageIndex}
            imageUrls={gallery}
            backgroundColor="rgba(0, 0, 0, 0.95)"
            // renderArrowLeft={() => <Icon name="ios-arrow-back" style={styles.arrow} />}
            // renderArrowRight={() => <Icon name="ios-arrow-forward" style={styles.arrow} />}
            loadingRender={() => <ActivitySpinner color="white" size={40} style={styles.imageLoading} />}
          />
          <Text style={styles.modalClose} onPress={this.toggleModal}>Close</Text>
        </Modal>
      </Container>
    );
  }
}

ListingDetailsScreen.propTypes = {
  id: PropTypes.number,
  user: PropTypes.object,
  item: PropTypes.object,
  token: PropTypes.string,
  getListing: PropTypes.func,
  favourites: PropTypes.array,
  addFavourite: PropTypes.func,
  removeFavourite: PropTypes.func,
  currentLocation: PropTypes.object,
  getListingReviews: PropTypes.func,
  onLeftButton: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    favourites: state.app.favourites,
    item: state.listings.selectedListing,
    currentLocation: state.app.currentLocation,
  };
};

export default connect(mapStateToProps, {
  addFavourite, removeFavourite, getListing, getListingReviews,
})(ListingDetailsScreen);
