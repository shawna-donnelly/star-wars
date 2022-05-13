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

export default function Navigation() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="PeopleHome" component={PeopleHomeScreen} />
            <Stack.Screen name="PersonDetail" component={PersonDetail} />
            <Stack.Screen name="PlanetsHome" component={PlanetsHomeScreen} />
            <Stack.Screen name="PlanetDetail" component={PlanetDetail} />
            <Stack.Screen name="ShipsHome" component={ShipsHomeScreen} />
            <Stack.Screen name="StarshipDetail" component={StarshipDetail} />
            <Stack.Screen name="VehicleDetail" component={VehicleDetail} />
            <Stack.Screen name="FilmsHome" component={FilmsHomeScreen} />
            <Stack.Screen name="FilmDetail" component={FilmDetail} />
        </Stack.Navigator>
    );
}
