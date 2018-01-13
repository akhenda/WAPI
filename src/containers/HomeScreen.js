import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import LoadingIndicator from 'src/components/LoadingIndicator';
import { getUserInfo } from 'src/state/actions/auth';
import styles from './styles/HomeScreenStyles';


class HomeScreen extends Component {  
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { user } = this.props;

    if (user === null) return <LoadingIndicator />;

    return (
      <View style={styles.container}>
        <Text>
          HomeScreen
        </Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
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

export default connect(mapStateToProps, { getUserInfo })(HomeScreen);
