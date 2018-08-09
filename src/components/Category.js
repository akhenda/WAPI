import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import FastImage from 'react-native-fast-image';

import styles from './styles/CategoryStyles';


const Category = ({
  image: uri, title, descritption, titleSize, onSelectCategory,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.category} onPress={onSelectCategory}>
      <View style={styles.categoryImageContainer}>
        <FastImage
          style={styles.categoryImage}
          source={{ uri, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: titleSize }]}>{title.toUpperCase()}</Text>
        <View style={styles.separator} />
        <Text style={styles.descritption}>{descritption}</Text>
      </View>
    </TouchableOpacity>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  titleSize: PropTypes.number,
  descritption: PropTypes.string,
  fallbackImage: PropTypes.number,
  onSelectCategory: PropTypes.func,
};

export default Category;
