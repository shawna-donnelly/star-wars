/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { ThemeProvider } from '@rneui/themed';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import Navigation from './navigation/Navigation';

const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
});

const App = () => {
    useEffect(() => {
        if (__DEV__) {
            //LogBox.ignoreAllLogs(true);
            import('./ReactotronConfig').then(() => console.log!('Reactotron Configured'));
        }
    }, []);

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <ApolloProvider client={client}>
                    <NavigationContainer>
                        <Navigation />
                    </NavigationContainer>
                </ApolloProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default App;
