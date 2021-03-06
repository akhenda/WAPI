import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {
  View, FlatList, Text, ActivityIndicator,
} from 'react-native';

import { stripHTML } from 'src/utils/strip';
import shallowCompare, { shallowEqual } from 'src/utils/shallowCompare';
import { getCategoryListings, searchListings } from 'src/state/actions/listings';
import { addFavourite, removeFavourite } from 'src/state/actions/app';
import ListingItem from 'src/components/ListingItem';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/ListingsScreenStyles';


/* eslint-disable react/no-deprecated */
class ListingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      totalPages: 1,
      places: [],
      empty: false,
      loading: false,
      refreshing: false,
      error: {},
    };
  }

  componentDidMount() {
    this.fetchListings();
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.state;

    // console.tron.display({
    //   name: '🔥 IGNITE - shallowEqual 🔥',
    //   preview: 'You should totally expand this',
    //   value: {
    //     '💃': 'Welcome to the future!',
    //     props: this.props,
    //     nextProps,
    //     data: shallowEqual(nextProps.places, this.props.places),
    //   },
    // });

    if (!shallowEqual(nextProps.places, this.props.places)) {
      this.setState((prevState) => {
        return {
          loading: false,
          refreshing: false,
          totalPages: Number(nextProps.totalPages),
          places: page === 1 ? nextProps.places : [...prevState.places, ...nextProps.places],
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  fetchListings = () => {
    const {
      token, isSearch, selectedCategory, searchText,
    } = this.props;

    this.setState({ loading: true });
    if (isSearch) {
      this.props.searchListings(token, searchText);
    } else {
      this.props.getCategoryListings(token, selectedCategory.id, this.state.page);
    }
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    }, () => {
      this.fetchListings();
    });
  }

  handleLoadMore() {
    if (this.state.page < this.state.totalPages) {
      this.setState((prevState) => {
        return { loading: true, page: prevState.page + 1 };
      }, () => {
        this.fetchListings();
      });
    }
  }

  onAddFavourite = (id) => {
    this.props.addFavourite(id);
  }

  onRemoveFavourite = (id) => {
    this.props.removeFavourite(id);
  }

  renderFooter() {
    return (
      this.state.loading
      && <View style={{ paddingVertical: 20 }}>
           <ActivityIndicator animating size="large" />
         </View>
    );
  }

  render() {
    let listingType = 'compact';
    const emptyHeight = '100%';
    const { loading, refreshing, places } = this.state;
    const {
      currentLocation, favourites, selectedCategory, isSearch, searchText,
    } = this.props;
    const empty = places.length > 0;
    if (selectedCategory !== null) {
      listingType = selectedCategory.name.indexOf('Restaurant') >= 0 ? 'large' : 'compact';
      listingType = 'compact'; // force all listings to be consistent for now
    }
    const headerTitle = isSearch ? `Search: ${searchText}` : selectedCategory.name;

    if (loading && places.length === 0) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          opaqueHeader
          showLogo={false}
          menuRightIcon="md-map"
          WrapperComponent={View}
          menuLeftIcon="arrow-back"
          onLeftButton={Actions.pop}
          showToolbarRightButton={false}
          headerTitle={stripHTML(headerTitle)}
        >
          <View style={[styles.content, empty ? { height: emptyHeight } : null]}>
            {empty
              ? <FlatList
                  data={places}
                  keyExtractor={item => `wapi-${item.id}`}
                  renderItem={({ item }) => {
                    return (
                      <ListingItem
                        item={item}
                        type={listingType}
                        location={currentLocation}
                        onAddFavourite={this.onAddFavourite}
                        onRemoveFavourite={this.onRemoveFavourite}
                        isFavourite={favourites.includes(item.id)}
                      />
                    );
                  }}
                  style={styles.listing}
                  refreshing={refreshing}
                  onEndReachedThreshold={0.5}
                  onRefresh={this.handleRefresh}
                  onEndReached={() => this.handleLoadMore()}
                  ListFooterComponent={() => this.renderFooter()}
                  ListHeaderComponent={() => <View style={styles.spacer}></View>}
                />
              : <View style={styles.emptyContainer}>
                  <Text style={styles.empty}>
                    {'No Listings found.\n\n¯\\_(ツ)_/¯\n\nTry reloading the app.'}
                  </Text>
                </View>
            }
          </View>
        </AnimatedContentWrapper>
      </Container>
    );
  }
}

ListingsScreen.propTypes = {
  user: PropTypes.object,
  places: PropTypes.array,
  error: PropTypes.object,
  token: PropTypes.string,
  isSearch: PropTypes.bool,
  favourites: PropTypes.array,
  searchText: PropTypes.string,
  totalPages: PropTypes.number,
  addFavourite: PropTypes.func,
  searchListings: PropTypes.func,
  removeFavourite: PropTypes.func,
  currentLocation: PropTypes.object,
  selectedCategory: PropTypes.object,
  getCategoryListings: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    error: state.listings.error,
    places: state.listings.places,
    favourites: state.app.favourites,
    totalPages: state.listings.totalPages,
    currentLocation: state.app.currentLocation,
    selectedCategory: state.listings.selectedCategory,
  };
};

export default connect(mapStateToProps, {
  getCategoryListings, addFavourite, removeFavourite, searchListings,
})(ListingsScreen);
