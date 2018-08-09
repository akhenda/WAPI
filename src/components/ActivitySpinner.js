import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Platform } from 'react-native';

import { colors } from '../theme';
import styles from './styles/ActivitySpinnerStyles';


const ActivitySpinner = (props) => {
  const { size, color, style } = props;

  return (
    <ActivityIndicator
      animating
      color={color || colors.primary.main}
      style={[styles.activityIndicator, style]}
      size={Platform.OS === 'ios' ? 'large' : size}
    />
  );
};

ActivitySpinner.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.string,
  style: ActivityIndicator.propTypes.style,
};

export default ActivitySpinner;
