import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container } from 'native-base';

import SearchBar from 'src/components/SearchBar';
import Salutation from 'src/components/Salutation';
import { getUserInfo } from 'src/state/actions/auth';
import CategoriesList from 'src/components/CategoriesList';
import LoadingIndicator from 'src/components/LoadingIndicator';
import AnimatedContentWrapper from 'src/components/AnimatedContentWrapper';

import styles from './styles/CompactListingStyles';


class CompactListing extends Component {  
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { user } = this.props;

    if (user === null) return <LoadingIndicator />;

    return (
      <Container style={styles.container}>
        <AnimatedContentWrapper headerTitle="Discover">
          <View style={styles.content}>
            <Salutation name={user.first_name || 'Stranger 😃'} />
            <SearchBar />
            { /* TODO: Fetch this category list from an API */ }
            <CategoriesList />
          </View>
        </AnimatedContentWrapper>
      </Container>
    );
  }
}

CompactListing.propTypes = {
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

export default connect(mapStateToProps, { getUserInfo })(CompactListing);
