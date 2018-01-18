import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import CacheableImage from 'react-native-cacheable-image';

import styles from './styles/CategoryStyles';


const Category = ({
  image, title, descritption, titleSize, fallbackImage,
}) => {
  return (
    <View style={styles.category}>
      <View style={styles.categoryImageContainer}>
        <CacheableImage
          style={styles.categoryImage}
          source={{ uri: image }}
          defaultSource={fallbackImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { fontSize: titleSize }]}>{title.toUpperCase()}</Text>
        <View style={styles.separator} />
        <Text style={styles.descritption}>{descritption}</Text>
      </View>
    </View>
  );
};

Category.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  titleSize: PropTypes.number,
  descritption: PropTypes.string,
  fallbackImage: PropTypes.number,
};

export default Category;
