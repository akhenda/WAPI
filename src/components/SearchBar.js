import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Icon, Button } from 'native-base';

import styles from './styles/SearchBarStyles';

const submitSearch = () => {
  /* eslint-disable no-alert */
  alert('Searching...');
};

const SearchBar = (props) => {  
  return (
    <Item rounded style={styles.container}>
      <Input
        returnKeyType='search'
        onSubmitEditing={submitSearch}
        placeholder={props.placeholder}
      />
    <Button rounded transparent onPress={submitSearch} style={styles.barButton}>
        <Icon active name='search' style={styles.barIcon} />
      </Button>
    </Item>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search',
};

export default SearchBar;
