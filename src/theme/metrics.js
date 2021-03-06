import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isiOS = Platform.OS === 'ios';
export const isIphoneX = isiOS && (height === 812 || width === 812);
export const iOSHeaderTopPadding = isIphoneX ? 39 : 15;
export const iOSHeaderHeight = isIphoneX ? 88 : 64;

const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: isiOS ? iOSHeaderHeight : 54,
  headerMaxHeight: height * 0.38,
  headerMinHeight: isiOS ? 60 : 86,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200,
  },
  // refer to https://github.com/GeekyAnts/NativeBase/issues/899
  animatedHeaderPaddingTop: isiOS ? iOSHeaderTopPadding : 0 + StatusBar.currentHeight,
  animatedHeaderHeight: isiOS ? iOSHeaderHeight : (56 + StatusBar.currentHeight),
};

export default metrics;
