/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect,useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import { ToastProvider, Toast } from 'react-native-toast-notifications';
import { AppState, AppStateStatus } from 'react-native';

const SANOFI_URL = 'https://www.dupixentmyway.co.uk/?r=how-to-inject&utm_source=1-how-to-inject&utm_medium=push&utm_campaign=dupixent-psp';
const WIKI_URL = 'https://www.wikipedia.org/';

const App = () => {
  const [isSanofi, setIsSanofi] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  const handleAppStateChange = useCallback(
    async (nextAppState) => {
      if(nextAppState.match(/background|inactive/)){
        Toast.show(`App state changed to ${nextAppState}`, {
          type: 'error',
          duration: 3000,
        });
      }
    },
    [],
  );

  const onUpdateTabView = (isSanofi) => {
    setIsSanofi(isSanofi);
  }

  const renderHeaderTabs = () => {
    return (
      <ToastProvider placement="top">
        <View style={{ flexDirection: 'row', paddingHorizontal: 80, paddingVertical: 10, justifyContent: 'space-between' }} >
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => onUpdateTabView(true)}>
              <Text style={styles.sectionTitle}
                color={isSanofi ? '#000' : '#00000099'}>Sanofi</Text>
            </TouchableOpacity>
            <View style={[styles.tabIndicator, isSanofi ? {} : { backgroundColor: '#FFF' }]}></View>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => onUpdateTabView(false)}>
              <Text style={styles.sectionTitle}
                color={!isSanofi ? '#000' : '#00000075'}>Wiki</Text>
            </TouchableOpacity>
            <View style={[styles.tabIndicator, isSanofi ? { backgroundColor: '#FFF' } : {}]}></View>
          </View>
        </View>
      </ToastProvider>
    )
  }

  return (
    <View style={styles.appContainer}>
      <View>
        {renderHeaderTabs()}
      </View>
      <View style={{ borderColor: 'black', borderWidth: 1, flex: 1, marginVertical: 10 }}>
        <WebView
          bounces={false}
          source={{ uri: isSanofi ? SANOFI_URL : WIKI_URL }}
          containerStyle={{ flex: 1 }}
          webviewDebuggingEnabled={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabIndicator: {
    width: 50,
    height: 3,
    backgroundColor: '#000',
    marginVertical: 5,
    borderRadius: 5
  },
  tabContainer: {
    alignItems: 'center'
  }
});

export default App;
