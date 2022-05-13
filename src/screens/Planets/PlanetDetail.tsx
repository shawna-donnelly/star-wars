import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Film, Person, Planet } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FilmMapper, PersonMapper } from '../../components/Mappers';

export const PlanetDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
    const route = useRoute();
    let { id } = route.params;

    const [films, setFilms] = useState([] as Film[]);
    const [residents, setResidents] = useState([] as Person[]);

    const [planet, setPlanet] = useState(undefined as unknown as Planet);

    const { data, loading } = useQuery<{ planet: Planet }, any>(gql`
        {
          planet(id: "${id}") {
            name
            diameter
            gravity
            population
            residentConnection {
              residents {
                id
                name
              }
            }
            filmConnection {
              films {
                id
                title
              }
            }
          }
        }
    `);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.planet?.name,
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation, data]);

    useEffect(() => {
        if (data) {
            setPlanet(data.planet);
        }
    }, [data]);

    useEffect(() => {
        setFilms(planet?.filmConnection?.films);
        setResidents(planet?.residentConnection?.residents);
    }, [planet]);

    return (
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={data.planet?.name || ''} />
                        <DataItem title="Diameter:" value={data.planet?.diameter?.toString() || ''} />
                        <DataItem title="Gravity:" value={data.planet?.gravity || ''} />
                        <DataItem title="Population:" value={data.planet?.population?.toString() || ''} />
                    </View>
                    <Text style={globalStyles.disclaimerText}>Click on the items below to see more details</Text>

                    <LightSaberSeparator />
                    <PersonMapper data={residents} dataTitle="Residents" />
                    <LightSaberSeparator />
                    <FilmMapper data={films} />
                    <LightSaberSeparator />
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: { color: textColor, margin: 5, fontSize: 16 },
});
