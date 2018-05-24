import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Modal, Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Fab, Icon } from 'native-base';
import Config from 'react-native-config';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import ViewMoreText from 'react-native-view-more-text';
import ImageViewer from 'react-native-image-zoom-viewer';
import GoogleStaticMap from 'react-native-google-static-map';

import { stripHTML } from 'src/utils/strip';
import { openStatus } from 'src/utils/businessHours';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { addFavourite, removeFavourite } from 'src/state/actions/app';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import { colors, metrics } from 'src/theme';
import styles from './styles/ListingDetailsScreenStyles';


/* eslint-disable camelcase */
class ListingDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empty: false,
      loading: false,
      imageIndex: 0,
      modalVisible: false,
    };
  }

  toggleModal = (index = 0) => {
    this.setState(prevState => ({ modalVisible: !prevState.modalVisible, imageIndex: index }));
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
    const { isOpen } = openStatus(listingpro.business_hours);
    let onFavourite = () => this.props.addFavourite(this.props.item);
    const isFavourite = Object.keys(this.props.favourites).includes(String(id));

    const gallery = gallery_images.map(img => ({ url: img[0] }));

    if (isFavourite) {
      onFavourite = () => this.props.removeFavourite(this.props.item.id);
    }

    if (loading) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          showLogo={false}
          bannerSourceIsURI
          linearGradient={false}
          menuRightIcon="md-map"
          menuLeftIcon="arrow-back"
          onLeftButton={Actions.listings}
          headerTitle={title.rendered}
          showToolbarRightButton={false}
          bannerSource={featured_image_url[0]}
        >
          <Text style={styles.title} numberOfLines={1}>{title.rendered}</Text>
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
                ? <View style={[styles.contactItem, styles.address]}>
                    <Text style={styles.addressText} numberOfLines={2}>{listingpro.gAddress}</Text>
                    <Icon name="pin" style={styles.addressIcon} />
                  </View>
                : null}
              {listingpro.phone
                ? <View style={[styles.contactItem, styles.phone]}>
                    <Text style={styles.phoneText} numberOfLines={1}>{listingpro.phone}</Text>
                    <Icon name="call" style={styles.phoneIcon} />
                  </View>
                : null}
              {listingpro.email
                ? <View style={[styles.contactItem, styles.email]}>
                    <Text style={styles.emailText} numberOfLines={1}>{listingpro.email}</Text>
                    <Icon name="at" style={styles.emailIcon} />
                  </View>
                : null}
              {listingpro.website
                ? <View style={[styles.contactItem, styles.website]}>
                    <Text style={styles.websiteText} numberOfLines={1}>{listingpro.website}</Text>
                    <Icon name="globe" style={styles.websiteIcon} />
                  </View>
                : null}
            </View>

            {gallery_images.length > 0
              ? <FlatList
                  horizontal
                  data={gallery_images}
                  keyExtractor={item => item[0]}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity onPress={() => this.toggleModal(index)}>
                        <Image
                          resizeMode="cover"
                          source={{ uri: item[0] }}
                          style={styles.galleryItem}
                        />
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

            <View style={[styles.dropShadow, styles.reviews]}>
              <Text style={[styles.titles, styles.reviewsTitle]}>How others rate this place</Text>
              <View style={styles.ratings}>
                <View style={styles.ratingsValueContainer}>
                  <Text style={styles.ratingsValue}>{listing_rate || '0.0'}</Text>
                </View>
                <View style={styles.starsContainer}>
                  <View style={styles.stars}>
                    <StarRating
                      disabled
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      rating={Number(listing_rate) || 0}
                      starSize={18}
                      style={{ width: 50 }}
                      starColor={colors.secondary.light}
                    />
                  </View>
                <Text style={styles.totalRevies}>{listing_reviewed || 0} Reviews</Text>
                </View>
              </View>
            </View>

            <View style={[styles.dropShadow, styles.mapContainer]}>
              <View style={styles.mapLoading}>
                <ActivityIndicator size="large" color={colors.secondary.light} />
              </View>
              <GoogleStaticMap
                style={styles.map}
                latitude={listingpro.latitude || '0.0'}
                longitude={listingpro.longitude || '0.0'}
                zoom={13}
                size={{ width: metrics.screenWidth, height: 220 }}
                apiKey={Config.GOOGLE_MAPS_API_KEY}
              />
            </View>

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
          <Fab
            active
            style={styles.fab}
            position="topRight"
            onPress={onFavourite}
          >
            <Icon name={isFavourite ? 'ios-heart' : 'ios-heart-outline'} />
          </Fab>
        </AnimatedContentWrapper>
        <Modal visible={modalVisible} transparent={true} onRequestClose={this.toggleModal}>
          <ImageViewer
            imageUrls={gallery}
            index={imageIndex}
            backgroundColor="rgba(0, 0, 0, 0.95)"
            
          />
          <Text style={styles.modalClose} onPress={this.toggleModal}>Close</Text>
        </Modal>
      </Container>
    );
  }
}

ListingDetailsScreen.propTypes = {
  user: PropTypes.object,
  item: PropTypes.object,
  favourites: PropTypes.object,
  addFavourite: PropTypes.func,
  removeFavourite: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    favourites: state.app.favourites,
  };
};

export default connect(mapStateToProps, { addFavourite, removeFavourite })(ListingDetailsScreen);
