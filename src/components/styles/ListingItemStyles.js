import { StyleSheet } from 'react-native';

import { colors } from 'src/theme';

const styles = StyleSheet.create({
  compact: {
    elevation: 2,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: colors.primary.text,
  },
  compactImageContainer: {
    flex: 1.1,
  },
  compactImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  compactContent: {
    flex: 1.9,
    padding: 8,
  },
  compactTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: colors.secondary.text,
    backgroundColor: 'transparent',
  },
  compactAddress: {
    flexDirection: 'row',
  },
  compactAddressIcon: {
    fontSize: 14,
    marginTop: 3,
    backgroundColor: 'transparent',
  },
  compactAddressText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    color: colors.lightestText,
    backgroundColor: 'transparent',
  },
  compactRating: {
    marginTop: 4,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  compactRatingText: {
    fontSize: 11,
    color: colors.lighterText,
    backgroundColor: 'transparent',
  },
  compactDescription: {
    marginTop: 4,
    fontSize: 12,
    color: colors.lighterText,
    backgroundColor: 'transparent',
  },
  compactDistance: {
    marginTop: 4,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    backgroundColor: colors.primary.lightest,
  },
  compactDistanceIcon: {
    fontSize: 12,
    marginRight: 3,
    backgroundColor: 'transparent',
  },
  compactDistanceText: {
    fontSize: 10,
    backgroundColor: 'transparent',
  },
  compactFavourite: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'transparent',
  },
  compactFavouriteIcon: {
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  
  large: {
    height: 200,
    elevation: 2,
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.primary.text,
  },
  largeImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  largeImageMask: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.statusBarTranslucentDarker,
  },
  largeRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'transparent',
  },
  largeRatingValue: {
    fontSize: 13,
    marginRight: 4,
    fontWeight: '800',
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  largeRatingIcon: {
    fontSize: 14,
    color: colors.secondary.light,
    backgroundColor: 'transparent',
  },
  largeRatingText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  largeFavourite: {
    position: 'absolute',
    top: 12,
    right: 14,
    backgroundColor: 'transparent',
  },
  largeFavouriteIcon: {
    fontSize: 20,
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  largeContent: {
    padding: 12,
  },
  largeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeOpenStatus: {
    padding: 6,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: colors.statusBarTranslucentDark,
  },
  largeOpenStatusText: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.secondary.light,
  },
  largeDistance: {
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  largeDistanceIcon: {
    fontSize: 17,
    marginRight: 3,
    color: colors.primary.lighter,
    backgroundColor: 'transparent',
  },
  largeDistanceText: {
    fontSize: 13,
    color: colors.primary.lighter,
    backgroundColor: 'transparent',
  },
  largeTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  largeAddress: {
    flexDirection: 'row',
  },
  largeAddressIcon: {
    fontSize: 14,
    marginTop: 3,
    color: colors.primary.text,
    backgroundColor: 'transparent',
  },
  largeAddressText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
    color: colors.primary.lightest,
    backgroundColor: 'transparent',
  },
  largeDescription: {
    marginTop: 4,
    fontSize: 12,
    color: colors.secondary.light,
    backgroundColor: 'transparent',
  },
});

export default styles;
