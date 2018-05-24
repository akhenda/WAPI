import { StyleSheet } from 'react-native';

import { colors } from 'src/theme';

const styles = StyleSheet.create({
  category: {
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 3,

    // iOS Drop Shadow
    borderWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  categoryImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
    borderRadius: 5,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
    borderRadius: 5,
  },
  textContainer: {
    width: '40%',
    height: '100%',
    paddingLeft: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: '700',
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  separator: {
    height: 1,
    width: '90%',
    marginVertical: 10,
    backgroundColor: colors.primary.lightest,
  },
  descritption: {
    fontSize: 12,
    color: colors.primary.lightest,
    backgroundColor: 'transparent',
  },
});

export default styles;
