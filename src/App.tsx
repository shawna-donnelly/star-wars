import React, { useEffect } from 'react';
import { ThemeProvider } from '@rneui/themed';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Sound from 'react-native-sound';

import Navigation from './navigation/Navigation';
import reactotron from 'reactotron-react-native';

const client = new ApolloClient({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    cache: new InMemoryCache(),
});

Sound.setCategory('Playback');
export const hum = new Sound('hum.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
        reactotron.log!('Failed to load the sound', error);
    }
});

const App = () => {
    useEffect(() => {
        hum.setNumberOfLoops(2);

        hum.play(success => {
            if (success) {
                reactotron.log!('Successfully played the sound');
            } else {
                reactotron.log!('Playback failed due to audio decoding errors');
            }
        });
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
