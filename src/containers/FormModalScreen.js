import React from 'react';
import { PropTypes } from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';

import { colors } from 'src/theme';

export default class FormModalScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <StatusBar translucent={false} barStyle="light-content" backgroundColor={colors.primary.dark} />
        { this.props.renderScene() }
      </ScrollView>
    );
  }
}

FormModalScreen.propTypes = {
  renderScene: PropTypes.func,
};
