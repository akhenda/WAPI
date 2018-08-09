import { StyleSheet } from 'react-native';

import { colors } from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '60%',
    resizeMode: 'contain',
    marginTop: -30,
  },
  loadingText: {
    fontSize: 22,
    color: colors.secondary.dark,
  },
});

export default styles;
