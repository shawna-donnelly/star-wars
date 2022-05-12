import reactotron from 'reactotron-react-native';

// First, set some configuration settings on how to connect to the app
reactotron.configure({
    name: 'AdvocacyDay App',
    //host: "169.254.117.47", // apple
    //host: "192.168.0.170", // android
    //port: 9090
});

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
reactotron.useReactNative({
    //asyncStorage: {ignore: ['secret']},
});

// add some more plugins for redux & redux-saga
//Reactotron.use(reduxPlugin());
//Reactotron.use(sagaPlugin());

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
    reactotron.connect();
    //Reactotron.clear()
}
