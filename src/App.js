import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import AuthHome from './auth';
import StackRoutes from './navigation/stackRoutes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import auth from "@react-native-firebase/auth";
import AuthStackRoutes from './navigation/auth/authStack';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [authenticated, setAuthenticated] = useState(false)
  // Initialize Apollo Client
  const client = new ApolloClient({
    uri: 'https://developers.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
      'x-hasura-admin-secret': 'fXYPjcmYB0wsp5PchwowLsF1fPOKs88rrXiRAJfrs4SS5fqyiyGu02NwYtJMLoWD',
      'content-type': 'application/json'
    }
  });
  Text.defaultProps = {}
  Text.defaultProps.allowFontScaling = false
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true)
      } else setAuthenticated(false)
    })
  })
  console.log(authenticated,'ad');
  return (
    // <Provider store={Store}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor="white" />
      <ApolloProvider client={client}>
        {authenticated ? <StackRoutes /> : <AuthStackRoutes />}
      </ApolloProvider>
    </SafeAreaView>
    // </Provider> 
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;

