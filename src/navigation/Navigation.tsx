import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import { FilmDetail } from '../screens/Films/FilmDetail';
import { FilmsHomeScreen } from '../screens/Films/FilmsHomeScreen';
import { HomeScreen } from '../screens/Home/HomeScreen';
import { PeopleHomeScreen } from '../screens/People/PeopleHomeScreen';
import { PersonDetail } from '../screens/People/PersonDetail';
import { PlanetDetail } from '../screens/Planets/PlanetDetail';
import { PlanetsHomeScreen } from '../screens/Planets/PlanetsHomeScreen';
import { ShipsHomeScreen } from '../screens/Ships/ShipsHomeScreen';
import { StarshipDetail } from '../screens/Ships/StarshipDetail';
import { VehicleDetail } from '../screens/Ships/VehicleDetail';

export type DetailRouteProp = {
    id: string;
};

export type RootStackParamList = {
    Home: {};
    PeopleHome: {};
    PersonDetail: DetailRouteProp;
    PlanetsHome: {};
    PlanetDetail: DetailRouteProp;
    ShipsHome: {};
    StarshipDetail: DetailRouteProp;
    VehicleDetail: DetailRouteProp;
    FilmsHome: {};
    FilmDetail: DetailRouteProp;
};

export default function Navigation() {
    const RootStack = createNativeStackNavigator<RootStackParamList>();

    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="PeopleHome" component={PeopleHomeScreen} />
            <RootStack.Screen name="PersonDetail" component={PersonDetail} />
            <RootStack.Screen name="PlanetsHome" component={PlanetsHomeScreen} />
            <RootStack.Screen name="PlanetDetail" component={PlanetDetail} />
            <RootStack.Screen name="ShipsHome" component={ShipsHomeScreen} />
            <RootStack.Screen name="StarshipDetail" component={StarshipDetail} />
            <RootStack.Screen name="VehicleDetail" component={VehicleDetail} />
            <RootStack.Screen name="FilmsHome" component={FilmsHomeScreen} />
            <RootStack.Screen name="FilmDetail" component={FilmDetail} />
        </RootStack.Navigator>
    );
}
