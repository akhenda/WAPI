import { StyleSheet, Platform, StatusBar } from 'react-native';

import { colors, metrics } from 'src/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.text,
  },
  content: {
    backgroundColor: colors.primary.text,
  },
  favouriteFab: {
    position: 'absolute',
    top: metrics.headerMaxHeight + metrics.animatedHeaderPaddingTop + (Platform.OS === 'ios' ? 0 : 8),
    right: 72,
    marginTop: 0,
    backgroundColor: colors.secondary.main,
  },
  shareFab: {
    position: 'absolute',
    top: metrics.headerMaxHeight + metrics.animatedHeaderPaddingTop + (Platform.OS === 'ios' ? 0 : 8),
    marginTop: 0,
    backgroundColor: colors.secondary.light,
  },
  dropShadow: {
    padding: 15,
    marginBottom: Platform.OS === 'ios' ? 6 : 0,
    elevation: 3,

    borderWidth: 0,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,

    backgroundColor: colors.primary.text,
  },
  titleContainer: {
    height: metrics.headerMaxHeight + metrics.animatedHeaderHeight,
  },
  title: {
    flex: 1,
    fontSize: 24,
    marginLeft: 15,
    fontWeight: '800',
    marginRight: '36%',
    marginBottom: 10,
    // flexWrap: 'wrap',
    color: colors.primary.text,
    backgroundColor: 'transparent',
    // marginTop: metrics.headerMaxHeight,
    position: 'absolute',
    bottom: 0,
  },
  contacts: {},
  openStatus: {
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.secondary.main,
  },
  openStatusText: {
    fontSize: 13,
    color: colors.primary.lightest,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  contactsTopSpacer: {
    marginTop: 35,
  },
  addressText: {
    width: '80%',
  },
  phoneText: {
    width: '80%',
  },
  emailText: {
    width: '80%',
  },
  website: {
    borderBottomWidth: 0,
  },
  websiteText: {
    width: '80%',
  },
  gallery: {
    padding: 10,
    backgroundColor: colors.primary.lightest,
  },
  galleryItemContainer: {
    // drop shadow for iOS
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  galleryItem: {
    width: 100,
    height: 100,
    // borderWidth: 6,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    // resizeMode: 'cover',
    // borderColor: colors.primary.text,

    // drop shadow for android
    elevation: 3,
  },
  moreInfo: {
    marginBottom: 20,
  },
  titles: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 5,
    color: colors.secondary.text,
  },
  description: {
    fontSize: 14,
    color: colors.lighterText,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    fontSize: 17,
    marginRight: 6,
    color: colors.secondary.main,
  },
  verifiedText: {
    fontSize: 15,
    color: colors.secondary.main,
  },
  reviews: {
    marginBottom: 20,
  },
  ratings: {
    flex: 1,
    marginTop: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingsValueContainer: {
    flex: 1,
    padding: 8,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: colors.secondary.main,
  },
  ratingsValue: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.primary.text,
  },
  starsContainer: {
    flex: 6,
  },
  stars: {
    width: '25%',
  },
  totalRevies: {
    fontSize: 12,
    color: colors.lightestText,
  },
  mapContainer: {
    padding: -15,
    marginBottom: 20,
  },
  mapLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessHours: {
    marginBottom: 40,
  },
  businessHoursContent: {
    flex: 1,
    marginTop: 8,
    marginBottom: 12,
  },
  businessHoursContentRow: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  businessHoursContentDay: {
    width: '60%',
    fontSize: 15,
    fontWeight: '600',
    color: colors.secondary.text,
  },
  businessHoursContentTitle: {
    width: '20%',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  businessHoursContentTime: {
    width: '20%',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: colors.lightestText,
  },

  readMore: {
    marginTop: 5,
    color: colors.primary.main,
  },
  modalClose: {
    position: 'absolute',
    top: 34,
    right: 15,
    color: 'white',
    fontSize: 18,
  },
});

export default styles;
