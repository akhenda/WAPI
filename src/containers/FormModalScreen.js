import React from 'react';
import { PropTypes } from 'prop-types';
import { ScrollView } from 'react-native';

export default class FormModalScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        { this.props.renderScene() }
      </ScrollView>
    );
  }
}

FormModalScreen.propTypes = {
  renderScene: PropTypes.func,
};
