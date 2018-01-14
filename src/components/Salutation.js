import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import { getGreeting } from 'src/utils/greeting';

import styles from './styles/SalutationStyles';

const Salutation = ({ name }) => {
  const { greeting, color } = getGreeting(name);

  return <Text style={[styles.text, { color }]}>{greeting}</Text>;
};

Salutation.propTypes = {
  name: PropTypes.string,
};

export default Salutation;
