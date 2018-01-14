import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

import styles from './styles/CategoryStyles';


const Category = ({
  image, title, descritption, titleSize,
}) => {
  return (
    <View style={styles.category}>
      <View style={styles.categoryImageContainer}>
        <Image source={image} style={styles.categoryImage} />
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
  image: PropTypes.number,
  titleSize: PropTypes.number,
  descritption: PropTypes.string,
};

export default Category;
