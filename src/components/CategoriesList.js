import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { images } from 'src/theme';
import Category from 'src/components/Category';

import styles from './styles/CategoriesListStyles';


const calculateTitleSize = (name) => {
  let size = 21;

  if (name.toLowerCase().indexOf('restaurants') >= 0) size = 16;
  if (name.toLowerCase().indexOf('volunteering') >= 0) size = 14;

  return size;
};

const getFallbackImageName = (name) => {
  let imageName = name.toLowerCase();

  if (imageName.indexOf('restaurants') >= 0) imageName = 'restaurants';
  if (imageName.indexOf('volunteering') >= 0) imageName = 'volunteering';

  return imageName;
};

const CategoriesList = (props) => {
  const { categories, onSelectCategory } = props;
  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const { id, name, description } = category;

        return (
          <Category
            id={id}
            key={id}
            title={name.split(' ')[0]}
            descritption={description}
            image={category.banner_image_url[0]}
            fallbackImage={images[getFallbackImageName]}
            titleSize={14}
            onSelectCategory={() => onSelectCategory(id, name)}
          />
        );
      })}
    </View>
  );
};

CategoriesList.propTypes = {
  name: PropTypes.string,
  categories: PropTypes.array,
  onSelectCategory: PropTypes.func,
};

export default CategoriesList;
