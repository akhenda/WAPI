import debugConfig from './debug';
import './sentry';

// Allow/disallow font-scaling in app
// DISABLE: does not work in RN 0.56.0
// Text.defaultProps.allowFontScaling = appConfig.allowTextFontScaling;

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !debugConfig.yellowBox;
}
