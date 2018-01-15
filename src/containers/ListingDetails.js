import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Image, Easing } from 'react-native';
import { connect } from 'react-redux';
import { Container, Text, Fab, Icon } from 'native-base';
import Config from 'react-native-config';
import ZoomImage from 'react-native-zoom-image';
import StarRating from 'react-native-star-rating';
import GoogleStaticMap from 'react-native-google-static-map';

import { colors, images } from 'src/theme';
import { getUserInfo } from 'src/state/actions/auth';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/ListingDetailsStyles';


class ListingDetails extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      item: {
        id: 9,
        title: 'Kitengela Hot Glass',
        address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
        rating: 4.5,
        ratings: 2,
        description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
        distance: 1.26,
      },
      empty: false,
      loading: false,
    };
    this.data = 0;
  }

  render() {
    const { item, loading } = this.state;
    const {
      title, address, rating, ratings, description,
    } = item;

    if (loading) return <LoadingIndicator />;
  
    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          showExtraButton
          showLogo={false}
          linearGradient={false}
          headerTitle={title}
          extraButtonIcon="md-map"
        >
          
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <View style={styles.content}>
            <View style={[styles.dropShadow, styles.contacts]}>
              <View style={[styles.contactItem, styles.address]}>
                <Text style={styles.addressText} numberOfLines={2}>{address}</Text>
                <Icon name="pin" style={styles.addressIcon} />
              </View>
              <View style={[styles.contactItem, styles.phone]}>
                <Text style={styles.phoneText} numberOfLines={1}>+254 724 733384</Text>
                <Icon name="call" style={styles.phoneIcon} />
              </View>
              <View style={[styles.contactItem, styles.email]}>
                <Text style={styles.emailText} numberOfLines={1}>jakhenda@gmail.com</Text>
                <Icon name="at" style={styles.emailIcon} />
              </View>
              <View style={[styles.contactItem, styles.website]}>
                <Text style={styles.websiteText} numberOfLines={1}>www.hendacorp.com</Text>
                <Icon name="globe" style={styles.websiteIcon} />
              </View>
            </View>
            
            <FlatList
              horizontal
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              keyExtractor={pic => pic}
              renderItem={() => {
                return (
                  <ZoomImage
                    source={images.shopping}
                    imgStyle={styles.galleryItem}
                    duration={200}
                    enableScaling={false}
                    easingFunc={Easing.ease}
                  />
                );
              }}
              style={[styles.gallery]}
            />
          
            <View style={[styles.dropShadow, styles.moreInfo]}>
              <View style={styles.verified}>
                <Icon name="thumbs-up" style={styles.verifiedIcon} />
                <Text style={styles.verifiedText}>Verified by WAPI?</Text>
              </View>
              <Text style={[styles.titles, styles.moreInfoTitle]}>Details</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          
            <View style={[styles.dropShadow, styles.reviews]}>
              <Text style={[styles.titles, styles.reviewsTitle]}>How others rate this place</Text>
              <View style={styles.ratings}>
                <View style={styles.ratingsValueContainer}>
                  <Text style={styles.ratingsValue}>{rating}</Text>
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
                      rating={rating}
                      starSize={18}
                      style={{ width: 50 }}
                      starColor={colors.secondary.light}
                    />
                  </View>
                <Text style={styles.totalRevies}>{ratings} Reviews</Text>
                </View>
              </View>
            </View>
          
            <View style={[styles.dropShadow, styles.mapContainer]}>
              <GoogleStaticMap
                style={styles.map}
                latitude={'-1.2897776'}
                longitude={'36.7748068'}
                zoom={13}
                size={{ width: '100%', height: 220 }}
                apiKey={Config.GOOGLE_MAPS_API_KEY}
              />
            </View>
          
            <View style={[styles.dropShadow, styles.owner]}>
              <Text style={[styles.titles, styles.ownerTitle]}>Meet the owner</Text>
              <View style={styles.ownerInfo}>
                <View style={styles.avatarContainer}>
                  <Image source={images.activities} style={styles.avatar} />
                </View>
                <View style={styles.ownerMeta}>
                  <Text style={styles.ownerName}>Joseph Akhenda</Text>
                  <Text style={styles.ownerText}>Member since March, 2017</Text>
                </View>
              </View>
            </View>
            
          </View>
          <Fab
            active
            style={styles.fab}
            position="topRight"
            onPress={() => {}}
          >
            <Icon name="heart" />
          </Fab>
        </AnimatedContentWrapper>
      </Container>
    );
  }
}

ListingDetails.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  getUserInfo: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { getUserInfo })(ListingDetails);
