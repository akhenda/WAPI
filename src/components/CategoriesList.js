import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { images } from 'src/theme';
import Category from 'src/components/Category';

import styles from './styles/CategoriesListStyles';

const CategoriesList = () => {
  return (
    <View style={styles.container}>
      <Category
        titleSize={21}
        title="Activities"
        image={images.activities}
        descritption="Looking for things to do? Place you’ve never been to?"
      />
      <Category
        titleSize={16}
        title="Restaurants"
        image={images.restaurants}
        descritption="Discover local flavours and places."
      />
      <Category
        titleSize={21}
        title="Medical"
        image={images.medical}
        descritption="From blood donations to first aid training."
      />
      <Category
        titleSize={21}
        title="Services"
        image={images.services}
        descritption="You have a unique requirement? You want something done?"
      />
      <Category
        titleSize={21}
        title="Shopping"
        image={images.shopping}
        descritption="From organic to designer, local trade to fair trade..."
      />
      <Category
        titleSize={14}
        title="Volunteering"
        image={images.volunteering}
        descritption="You have time to give? Possessions to part with?"
      />
    </View>
  );
};

CategoriesList.propTypes = {
  name: PropTypes.string,
};

export default CategoriesList;
