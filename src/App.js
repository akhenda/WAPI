import 'src/config';
import React, { Component } from 'react';
import {
  View, StatusBar, BackHandler, Alert,
} from 'react-native';
import { Provider } from 'react-redux';
import RNRestart from 'react-native-restart';
import RequiresConnection from 'react-native-offline-mode';
import { PersistGate } from 'redux-persist/es/integration/react';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';

import { store, persistor } from 'src/state';
import { colors } from './theme';
import styles from './theme/styles';
import Offline from './components/Offline';
import RootContainer from './containers/RootContainer';
import LoadingIndicator from './components/LoadingIndicator';


const errorHandler = (e, isFatal) => {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${(isFatal) ? 'Fatal:' : ''} ${e.name} ${e.message}
        We have reported this to our team! Please close the app and start again!
        `,
      [
        {
          text: 'Restart',
          onPress: () => RNRestart.Restart(),
        },
        {
          text: 'Quit',
          onPress: () => BackHandler.exitApp(),
        },
      ],
    );
  } else {
    if (__DEV__) console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};

setJSExceptionHandler(errorHandler, false);

// setNativeExceptionHandler((errorString) => {
//   if (__DEV__) console.log(`setNativeExceptionHandler: ${errorString}`);
// });

class App extends Component {
  onBeforeLift = () => {
    // take some action before the gate lifts
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<LoadingIndicator />}
          onBeforeLift={this.onBeforeLift}
          persistor={persistor}>
          <View style={styles.mainContainer}>
            <StatusBar translucent barStyle="light-content" backgroundColor={colors.statusBarTranslucent} />
            <RootContainer />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default RequiresConnection(App, Offline);
