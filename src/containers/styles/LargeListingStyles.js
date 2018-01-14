import { StyleSheet } from 'react-native';

import { colors, metrics } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.lightest,
  },
  content: {
    padding: 15,
    marginTop: metrics.headerMaxHeight - 130,
  },
  headerImageContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '60%',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
