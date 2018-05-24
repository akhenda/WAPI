import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';

import styles from './styles/CategoryStyles';


const Category = ({
  image, title, descritption, titleSize, fallbackImage, onSelectCategory,
}) => {
  return (
    <TouchableOpacity style={styles.category} onPress={onSelectCategory}>
      <View style={styles.categoryImageContainer}>
        <CacheableImage
          resizeMode="cover"
          source={{ uri: image }}
          style={styles.categoryImage}
          defaultSource={fallbackImage}
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
