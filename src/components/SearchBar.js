import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Icon, Button } from 'native-base';

import styles from './styles/SearchBarStyles';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { text: '' };
  }
  
  render() {
    const { text } = this.state;
    const { placeholder, onSearch } = this.props;

    return (
      <Item rounded style={styles.container}>
        <Input
          value={text}
          autoCorrect={false}
          autoCapitalize='none'
          returnKeyType='search'
          placeholder={placeholder}
          onSubmitEditing={() => onSearch(text)}
          onChangeText={val => this.setState({ text: val })}
        />
        <Button rounded transparent onPress={() => onSearch(text)} style={styles.barButton}>
          <Icon active name='search' style={styles.barIcon} />
        </Button>
      </Item>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'Search',
};

export default SearchBar;
