import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    Film,
    Node,
    PeopleConnection,
    Person,
    Planet,
    RootPersonArgs,
    Starship,
    Vehicle,
} from '../../__generated__/graphql';
import { gql, QueryResult, useQuery } from '@apollo/client';
import reactotron from 'reactotron-react-native';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { Type } from 'typescript';

export const PersonDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    let { id } = route.params;

    const [films, setFilms] = useState([] as Film[]);
    const [vehicles, setVehicles] = useState([] as Vehicle[]);
    const [starships, setStarships] = useState([] as Starship[]);
    const [person, setPerson] = useState(undefined as unknown as Person);

    const { data, loading } = useQuery<{ person: Person }, any>(gql`
        {
            person(id: "${id}") {
                id
                name
                birthYear
                gender
                mass
                homeworld {
                  id
                  name
                }           
                vehicleConnection {
                  vehicles {
                    name
                  }
                }
                species{
                  name
                }
                filmConnection{
                  films{
                    id
                    title
                  }
                }
                starshipConnection{
                  starships{
                    name
                    starshipClass
                  }
                }
              }
        }
    `);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.person?.name,
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation, data]);

    useEffect(() => {
        if (data) {
            setPerson(data.person);
        }
    }, [data]);

    useEffect(() => {
        setFilms(person?.filmConnection?.films);
        setVehicles(person?.vehicleConnection?.vehicles);
        setStarships(person?.starshipConnection?.starships);
    }, [person]);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={{ flexShrink: 1 }}>
                        <Text
                            style={[
                                styles.titleText,
                                {
                                    fontWeight: 'bold',
                                },
                            ]}
                        >
                            General Information
                        </Text>
                        <DataItem title="Name:" value={data.person?.name || ''} />
                        <DataItem title="Birth Year:" value={data.person?.birthYear || ''} />
                        <DataItem title="Gender:" value={data.person?.gender || ''} />
                        <DataItem title="Mass:" value={data.person?.mass?.toString() || ''} />
                    </View>
                    <Text style={{ fontSize: 10, color: textColor, fontStyle: 'italic', fontWeight: '300' }}>
                        Click on the items below to see more details
                    </Text>
                    <TouchableOpacity
                        style={{ flexShrink: 1 }}
                        onPress={() => navigation.navigate('PlanetDetail', { id: data?.person?.homeworld?.id })}
                    >
                        <DataItem title="Homeworld:" value={data.person?.homeworld?.name || ''} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flexShrink: 1 }}
                        onPress={() => navigation.navigate('SpeciesDetail', { id: data?.person?.species?.id })}
                    >
                        <DataItem title="Species:" value={data.person?.species?.name || 'Unknown'} />
                    </TouchableOpacity>
                    <LightSaberSeparator />
                    <Text style={[styles.titleText, { fontWeight: 'bold' }]}>Associated Vehicles</Text>
                    {vehicles?.map((vehicle: Vehicle) => {
                        return (
                            <TouchableOpacity
                                style={{ flexShrink: 1 }}
                                onPress={() => navigation.navigate('VehicleDetail', { id: vehicle.id })}
                            >
                                <DataItem title="-" value={vehicle.name || ''} />
                            </TouchableOpacity>
                        );
                    })}
                    {vehicles?.length === 0 && <DataItem title="" value="No Vehicles" />}
                    <LightSaberSeparator />
                    <Text style={[styles.titleText, { fontWeight: 'bold' }]}>Associated Films</Text>
                    {films?.map((film: Film) => {
                        return (
                            <TouchableOpacity
                                style={{ flexShrink: 1 }}
                                onPress={() => navigation.navigate('FilmDetail', { id: film.id })}
                            >
                                <DataItem title="-" value={film.title || ''} />
                            </TouchableOpacity>
                        );
                    })}
                    {films?.length === 0 && <DataItem title="" value="No Films" />}
                    <LightSaberSeparator />

                    <Text style={[styles.titleText, { fontWeight: 'bold' }]}>Associated Starships</Text>
                    {starships?.map((starship: Starship) => {
                        return (
                            <TouchableOpacity
                                style={{ flexShrink: 1 }}
                                onPress={() => navigation.navigate('StarshipDetail', { id: starship.id })}
                            >
                                <DataItem title="-" value={starship.name || ''} />
                            </TouchableOpacity>
                        );
                    })}
                    {starships?.length === 0 && <DataItem title="" value="No Starships" />}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    titleText: { color: textColor, margin: 5, fontSize: 16 },
});
