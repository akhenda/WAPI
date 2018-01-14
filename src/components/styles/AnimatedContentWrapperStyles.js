import { StyleSheet } from 'react-native';

import { colors, metrics } from 'src/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.primary.main,
    overflow: 'hidden',
    height: '70%',
  },
  bannerImage: {
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
  header: {
    flexDirection: 'row',
    backgroundColor: colors.primary.main,
    paddingTop: metrics.animatedHeaderPaddingTop,
    height: metrics.animatedHeaderHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 6,
  },
  headerButton: {
    alignSelf: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 30,
  },
  headerTitle: {
    fontSize: 20,
    color: colors.primary.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: metrics.animatedHeaderPaddingTop + 5,
    left: 5,
  },
  logo: {
    position: 'absolute',
    top: metrics.animatedHeaderPaddingTop,
    right: 15,
    width: '25%',
    height: '17.5%',
    resizeMode: 'contain',
  },
});

export default styles;
