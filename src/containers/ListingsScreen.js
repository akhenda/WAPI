import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { getCategoryListings } from 'src/state/actions/listings';
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
      listings: [],
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
        listings: page === 1 ? nextProps.listings : [...prevState.listings, ...nextProps.listings],
      };
    });
  }

  fetchListings = () => {
    const { token, selectedCategory } = this.props;

    this.setState({ loading: true });    
    this.props.getCategoryListings(token, selectedCategory.id, this.state.page);
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
    const { loading, refreshing, listings } = this.state;
    const { currentLocation, favourites, selectedCategory } = this.props;
    const empty = listings.length > 0;
    const listingType = selectedCategory.name.indexOf('Restaurant') >= 0 ? 'large' : 'compact';

    if (loading && listings.length === 0) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          opaqueHeader
          showLogo={false}
          showBannerRightButton
          WrapperComponent={View}
          menuLeftIcon="arrow-back"
          menuRightIcon="md-map"
          onLeftButton={Actions.pop}
          headerTitle={this.props.selectedCategory.name}
        >
          <View style={[styles.content, empty ? { height: emptyHeight } : null]}>
            {empty
              ? <FlatList
                  data={listings}
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
  error: PropTypes.object,
  token: PropTypes.string,
  listings: PropTypes.array,
  favourites: PropTypes.object,
  totalPages: PropTypes.number,
  addFavourite: PropTypes.func,
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
    favourites: state.app.favourites,
    listings: state.listings.listings,
    totalPages: state.listings.totalPages,
    currentLocation: state.app.currentLocation,
    selectedCategory: state.listings.selectedCategory,
  };
};

export default connect(mapStateToProps, {
  getCategoryListings, addFavourite, removeFavourite,
})(ListingsScreen);
