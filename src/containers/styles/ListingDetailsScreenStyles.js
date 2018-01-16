import { StyleSheet, Platform } from 'react-native';

import { colors, metrics } from 'src/theme';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.text,
  },
  content: {
    backgroundColor: colors.primary.text,
  },
  fab: {
    position: 'absolute',
    top: metrics.headerMaxHeight,
    marginTop: 0,
    backgroundColor: colors.secondary.main,
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
  title: {
    fontSize: 26,
    marginLeft: 15,
    fontWeight: '800',
    marginRight: '20%',
    marginBottom: 10,
    color: colors.primary.text,
    backgroundColor: 'transparent',
    marginTop: metrics.headerMaxHeight,
  },
  contacts: {},
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  address: {
    marginTop: 35,
  },
  addressText: {
    width: '70%',
  },
  website: {
    borderBottomWidth: 0,
  },
  gallery: {
    padding: 10,
    backgroundColor: colors.primary.lightest,
  },
  galleryItem: {
    width: 100,
    height: 100,
    borderWidth: 6,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 5,
    resizeMode: 'cover',
    borderColor: colors.primary.text,
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
  owner: {
    marginBottom: 40,
  },
  ownerInfo: {
    flex: 1,
    marginTop: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    marginRight: 12,
    borderRadius: 500,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  ownerName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.secondary.text,
  },
  ownerText: {
    fontSize: 12,
    fontWeight: '200',
    color: colors.lightestText,
  },
});

export default styles;