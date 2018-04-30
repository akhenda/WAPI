import { Sentry } from 'react-native-sentry';

if (!__DEV__) {
  Sentry.config('https://c5d1a182a4ca47e1bbd40246f8ff8302:10aeb55bb5ad4a9bb967eabd87db7157@sentry.io/1198602').install();  
}
