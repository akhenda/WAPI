import { StyleSheet } from 'react-native';

import { colors, metrics } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.lightest,
  },
  content: {
    flex: 1,
    padding: 15,
    marginTop: 60,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: metrics.screenHeight - 80,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.primary.text,
  },
  empty: {
    textAlign: 'center',
  },
});

export default styles;
