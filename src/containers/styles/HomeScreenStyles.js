import { StyleSheet } from 'react-native';

import { colors, metrics } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.lightest,
  },
  content: {
    paddingTop: 15,
    paddingHorizontal: 15,
    marginTop: metrics.headerMaxHeight - 130,
  },
});

export default styles;
