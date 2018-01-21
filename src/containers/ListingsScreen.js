import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { getCategoryListings, searchListings } from 'src/state/actions/listings';
import { addFavourite, removeFavourite } from 'src/state/actions/app';
import ListingItem from 'src/components/ListingItem';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/ListingsScreenStyles';


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
    
    console.tron.log(this.props);
    console.tron.log(nextProps);

    this.setState((prevState) => {
      return {
        loading: false,
        refreshing: false,
        totalPages: Number(nextProps.totalPages),
        places: page === 1 ? nextProps.places : [...prevState.places, ...nextProps.places],
      };
    });
  }

  fetchListings = () => {
    const {
      token, isSearch, selectedCategory, searchText,
    } = this.props;
    
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        props: this.props,
      },
    });

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
  
  onAddFavourite = (listing) => {
    this.props.addFavourite(listing);
  }
  
  onRemoveFavourite = (id) => {
    this.props.removeFavourite(id);
  }
  
  renderFooter() {
    return (
      this.state.loading &&
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  render() {
    const emptyHeight = '100%';
    const { loading, refreshing, places } = this.state;
    const {
      currentLocation, favourites, selectedCategory, isSearch, searchText,
    } = this.props;
    const empty = places.length > 0;
    const listingType = selectedCategory.name.indexOf('Restaurant') >= 0 ? 'large' : 'compact';
    const headerTitle = isSearch ? `Search: ${searchText}` : selectedCategory.name;

    if (loading && places.length === 0) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          opaqueHeader
          showLogo={false}
          showBannerRightButton
          menuRightIcon="md-map"
          WrapperComponent={View}
          menuLeftIcon="arrow-back"
          headerTitle={headerTitle}
          onLeftButton={Actions.pop}
        >
          <View style={[styles.content, empty ? { height: emptyHeight } : null]}>
            {empty
              ? <FlatList
                  data={places}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    return (
                      <ListingItem
                        item={item}
                        type={listingType}
                        onAddFavourite={this.onAddFavourite}
                        onRemoveFavourite={this.onRemoveFavourite}
                        isFavourite={Object.keys(favourites).includes(String(item.id))}
                        location={currentLocation}
                      />
                    );
                  }}
                  style={styles.listing}
                  refreshing={refreshing}
                  ListFooterComponent={() => this.renderFooter()}
                  onRefresh={this.handleRefresh}
                  onEndReached={() => this.handleLoadMore()}
                  onEndReachedThreshold={0.5}
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
  searchText: PropTypes.string,
  favourites: PropTypes.object,
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
