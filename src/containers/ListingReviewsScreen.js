import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import StarRating from 'react-native-star-rating';
import {
  Text,
  Icon,
  Card,
  Left,
  Body,
  Item,
  Input,
  Label,
  Button,
  Content,
  Textarea,
  CardItem,
  Thumbnail,
  Container,
} from 'native-base';

import { stripHTML } from 'src/utils/strip';
import { submitListingReview } from 'src/state/actions/listings';

import { colors, images } from 'src/theme';
import styles from './styles/ListingReviewsScreenStyles';


/* eslint-disable camelcase */
/* eslint-disable react/no-deprecated */
class ListingReviewsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      title: '',
      description: '',
      disableReview: false,
      isReviewModalVisible: false,
      listing_id: this.props.item.id,
    };
  }

  componentDidMount() {
    const { user, item, reviews } = this.props;

    reviews.forEach((review) => {
      // check to see if review_author_id === to current_logged_user_id
      // or if review_author_id === listing_author_id
      // if they are same disbale ratings input
      const authorID = Number(review.author.id);

      if (user.id === authorID || authorID === item.author) {
        this.setState({ disableReview: true });
      }
    });
  }

  toggleReviewModal = () => {
    this.setState({ isReviewModalVisible: !this.state.isReviewModalVisible });
  }

  onSubmit = () => {
    console.tron.log(this.state);
    const {
      title,
      rating,
      listing_id,
      description,
    } = this.state;
    const data = {
      title,
      rating,
      listing_id,
      description,
    };

    this.props.submitListingReview(this.props.token, data);
    this.setState({ isReviewModalVisible: false });
  }

  renderBanner(item) {
    const {
      title,
      listing_rate,
      listing_reviewed,
      featured_image_url,
    } = item;

    return (
      <View>
        <View style={styles.bannerContainer}>
          <FastImage style={styles.bannerImage} source={{ uri: featured_image_url[0] }} />
          <View style={styles.bannerMask} />
          <Text style={styles.bannerText}>{title.rendered}</Text>
        </View>

        <View style={[styles.dropShadow, styles.ratingsContainer]}>
          <View style={styles.ratings}>
            <View style={styles.ratingsValueContainer}>
              <Text style={styles.ratingsValue}>{listing_rate || '0.0'}</Text>
            </View>
            <View style={styles.stars}>
              <StarRating
                disabled
                maxStars={5}
                starSize={32}
                iconSet={'Ionicons'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                emptyStar={'ios-star-outline'}
                rating={Number(listing_rate) || 0}
                starColor={colors.secondary.light}
                fullStarColor={colors.secondary.main}
              />
            </View>
            <View style={styles.reviewsStats}>
              <Text style={styles.totalReviews}>{listing_reviewed || 0}</Text>
              <Text style={styles.totalReviewsText}>Reviews</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderReview(review) {
    return (
      <Card key={review.id} style={styles.card}>
        <CardItem>
          <Left>
            <Thumbnail
              source={{ uri: review.author.lp_avatar_url || review.author.avatar_url }}
            />
            <Body>
              <Text>{review.author.name}</Text>
              <View style={styles.smallStars}>
                <StarRating
                  disabled
                  maxStars={5}
                  starSize={20}
                  iconSet={'Ionicons'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  emptyStar={'ios-star-outline'}
                  starColor={colors.secondary.light}
                  fullStarColor={colors.secondary.main}
                  rating={Number(review.listingpro.rating) || 0}
                />
              </View>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={styles.title}>
              {stripHTML(review.title.rendered)}
            </Text>
            {/* <Image source={{ uri: null }} /> */}
            <Text>
              {stripHTML(review.content.rendered)}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <View style={styles.footerItem}>
            {Object.keys(review.listingpro).includes('review_Interesting')
              ? <View style={styles.footerItemButton}>
                  <Icon name="md-thumbs-up" style={styles.footerIcon} />
                  <Text style={styles.footerText}>
                    <Text style={styles.footerDigit}>
                      {review.listingpro.review_Interesting}
                    </Text>
                    {' '}
                    {review.listingpro.review_Interesting > 1 ? 'Likes' : 'Like'}
                  </Text>
                </View>
              : null}
          </View>
          <View style={styles.footerItem}>
            {Object.keys(review.listingpro).includes('review_Lol')
              ? <View
                  style={[styles.footerItemButton, { justifyContent: 'center' }]}
                >
                  <Icon
                    name="happy"
                    style={[styles.footerIcon, { color: colors.primary.light }]}
                  />
                  <Text style={styles.footerText}>
                    <Text style={styles.footerDigit}>
                      {review.listingpro.review_Lol}
                    </Text>
                    {' '}
                    {review.listingpro.review_Lol > 1 ? 'Lols' : 'Lol'}
                  </Text>
                </View>
              : null}
          </View>
          <View style={styles.footerItem}>
            {Object.keys(review.listingpro).includes('review_Love')
              ? <View
                  style={[styles.footerItemButton, { justifyContent: 'flex-end' }]}
                >
                  <Icon
                    name="md-heart"
                    style={[styles.footerIcon, { color: colors.secondary.dark }]}
                  />
                  <Text style={styles.footerText}>
                    <Text style={styles.footerDigit}>
                      {review.listingpro.review_Love}
                    </Text>
                    {' '}
                    {review.listingpro.review_Love > 1 ? 'Loves' : 'Love'}
                  </Text>
                </View>
              : null}
          </View>
        </CardItem>
      </Card>
    );
  }

  renderReviews(reviews) {
    return (
      <View style={styles.reviews}>
        {reviews.map(review => this.renderReview(review))}
      </View>
    );
  }

  renderModal() {
    return (
      <Modal isVisible={this.state.isReviewModalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate us and Write a Review</Text>

            <View style={styles.largeStars}>
              <StarRating
                maxStars={5}
                starSize={40}
                iconSet={'Ionicons'}
                fullStar={'ios-star'}
                rating={this.state.rating}
                halfStar={'ios-star-half'}
                emptyStar={'ios-star-outline'}
                starColor={colors.secondary.light}
                fullStarColor={colors.secondary.main}
                selectedStar={rating => this.setState({ rating })}
              />
            </View>

            <Label style={styles.modalReviewTitle}>Title</Label>
            <Item regular style={[styles.modalInputItem, { marginBottom: 10 }]}>
              <Input
                onChangeText={title => this.setState({ title })}
                placeholder="Example: It was an awesome experience to be there"
              />
            </Item>

            <Label style={styles.modalReviewMessage}>Review</Label>
            <Item regular style={styles.modalInputItem}>
              <Textarea
                rowSpan={5}
                onChangeText={description => this.setState({ description })}
                placeholder="Tip: A great review covers food, service, and ambiance. Got recommendations for your favorite dishes and drinks, or something everyone should try here? Include that too!"
              />
            </Item>

            <View style={styles.modalButtons}>
              <Button
                dark
                block
                style={[
                  styles.modalButton,
                  { marginRight: 7 },
                ]}
                onPress={this.toggleReviewModal}
              >
                <Text>Close</Text>
              </Button>

              <Button
                block
                success
                onPress={this.onSubmit}
                style={[styles.modalButton, { marginLeft: 7 }]}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { reviews, item } = this.props;

    return (
      <Container style={styles.container}>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={colors.primary.dark} />
        <Content bounces={false}>
          {this.renderBanner(item)}
          {reviews.length > 0
            ? this.renderReviews(reviews)
            : <View>
                <FastImage
                  resizeMode={'contain'}
                  style={styles.noReviews}
                  source={images.noReviews}
                />
                <Text style={styles.noReviewsText}>
                  Be the first one to review {stripHTML(item.title.rendered)}
                </Text>
              </View>}
        </Content>

        {!this.state.disableReview
          ? <View style={[styles.leaveReview, styles.dropShadow]}>
              <Button block success onPress={this.toggleReviewModal}>
                <Text>Leave a Review</Text>
              </Button>
            </View>
          : null}

        {this.renderModal()}
      </Container>
    );
  }
}

ListingReviewsScreen.propTypes = {
  id: PropTypes.number,
  user: PropTypes.object,
  item: PropTypes.object,
  token: PropTypes.string,
  reviews: PropTypes.array,
  submitListingReview: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    reviews: state.listings.reviews,
    item: state.listings.selectedListing,
  };
};

export default connect(mapStateToProps, { submitListingReview })(ListingReviewsScreen);
