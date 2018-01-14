import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import ListingItem from 'src/components/ListingItem';
import { getUserInfo } from 'src/state/actions/auth';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/ListingStyles';


class Listing extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          id: 1,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 2,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 3,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 4,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 5,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 6,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 7,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 8,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 9,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
        {
          id: 10,
          title: 'Kitengela Hot Glass',
          address: '5 Glass Lane, Oloosirkon – Masai Lodge Road, Off',
          rating: 4.5,
          ratings: 2,
          description: '100% recycled pieces of art, décor and everything glass you can think of. Discover the Kitengela universe with a workshop tour or treat yourself to one of their pieces.',
          distance: 1.26,
        },
      ],
      empty: false,
      loading: false,
    };
    this.data = 0;
  }

  render() {
    const emptyHeight = '100%';
    const { data, loading } = this.state;
    const empty = data.length > 0;

    if (loading) return <LoadingIndicator />;
  
    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper
          showExtraButton
          showLogo={false}
          headerTitle="Activities"
          extraButtonIcon="md-map"
        >
          <View style={[styles.content, empty ? { height: emptyHeight } : null]}>
            {empty
              ? <FlatList
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <ListingItem item={item} type="large" />}
                  ItemSeparatorComponent={this.renderSeparator}
                  ListHeaderComponent={this.renderHeader}
                  ListFooterComponent={this.renderFooter}
                  style={[styles.listing]}
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

Listing.propTypes = {
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

export default connect(mapStateToProps, { getUserInfo })(Listing);
