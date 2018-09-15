import { StyleSheet } from 'react-native';

import { colors } from 'src/theme';


const styles = StyleSheet.create({
  dropShadow: {
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

  container: {
    flex: 1,
    backgroundColor: colors.primary.text,
  },
  content: {},

  bannerContainer: {
    height: 90,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  bannerMask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: colors.statusBarTranslucentDarker,
  },
  bannerText: {
    fontSize: 22,
    textAlign: 'center',
    color: colors.primary.text,
  },

  ratingsContainer: {
    padding: 15,
    width: '90%',
    marginTop: -15,
    borderRadius: 6,
    marginBottom: 20,
    alignSelf: 'center',
  },
  ratings: {
    margin: 0, // 8
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingsValueContainer: {
    flex: 2,
    padding: 8,
    marginRight: 15,
    borderRadius: 5,
    backgroundColor: colors.primary.main,
  },
  ratingsValue: {
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.primary.text,
  },
  stars: {
    flex: 5,
  },
  reviewsStats: {
    flex: 2,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalReviews: {
    fontSize: 16,
    color: colors.lightestText,
  },
  totalReviewsText: {
    fontSize: 14,
    color: colors.lightestText,
  },

  reviews: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    // flex: 0,
  },
  smallStars: {
    width: '40%',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '900',
    color: colors.secondary.text,
  },
  footerItem: {
    flex: 1,
  },
  footerItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  footerIcon: {
    fontSize: 22,
    color: colors.secondary.main,
  },
  footerText: {
    fontSize: 13,
    marginLeft: -8,
    color: colors.primary.main,
    textAlignVertical: 'center',
  },
  footerDigit: {
    fontSize: 13,
    color: colors.primary.main,
  },

  noReviews: {
    width: '60%',
    alignSelf: 'center',
  },
  noReviewsText: {
    width: '80%',
    fontSize: 17,
    fontWeight: '900',
    alignSelf: 'center',
    textAlign: 'center',
  },

  leaveReview: {
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    backgroundColor: colors.primary.lightest,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '100%',
    padding: 15,
    borderRadius: 6,
    backgroundColor: colors.primary.text,
  },
  modalTitle: {
    fontSize: 17,
    marginBottom: 15,
    fontWeight: '800',
    color: colors.secondary.text,
  },
  largeStars: {
    width: '70%',
    marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
  },
  modalReviewTitle: {
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  modalInputItem: {
    borderRadius: 6,
    backgroundColor: colors.primary.lightest,
  },
  modalReviewMessage: {
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  modalButtons: {
    marginTop: 20,
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
  },
});

export default styles;
