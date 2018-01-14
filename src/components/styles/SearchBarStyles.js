import { StyleSheet } from 'react-native';

import { colors } from 'src/theme';


const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: colors.primary.text,
    paddingLeft: 15,
    height: 43,
    borderColor: colors.primary.lightest,
  },
  barButton: {
    alignSelf: 'center',
  },
  barIcon: {
    borderRadius: 40,
    color: colors.secondary.main,
    marginRight: 15,
    backgroundColor: 'transparent',
  },
});

export default styles;
