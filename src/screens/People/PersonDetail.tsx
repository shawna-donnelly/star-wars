import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Film, Person, Starship, Vehicle } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FilmMapper, StarshipMapper, VehicleMapper } from '../../components/Mappers';

export const PersonDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
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
                    id
                    name
                  }
                }
              }
        }
    `);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.person?.name || '',
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
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={data.person?.name || ''} />
                        <DataItem title="Birth Year:" value={data.person?.birthYear || ''} />
                        <DataItem title="Gender:" value={data.person?.gender || ''} />
                        <DataItem title="Mass:" value={data.person?.mass?.toString() || ''} />
                    </View>
                    <Text style={globalStyles.disclaimerText}>Click on the items below to see more details</Text>
                    <TouchableOpacity
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('PlanetDetail', { id: data?.person?.homeworld?.id })}
                    >
                        <DataItem title="Homeworld:" value={data.person?.homeworld?.name || ''} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('SpeciesDetail', { id: data?.person?.species?.id })}
                    >
                        <DataItem title="Species:" value={data.person?.species?.name || 'Unknown'} />
                    </TouchableOpacity>
                    <LightSaberSeparator />
                    <VehicleMapper data={vehicles} />
                    <LightSaberSeparator />
                    <FilmMapper data={films} />
                    <LightSaberSeparator />
                    <StarshipMapper data={starships} />
                </>
            )}
        </ScrollView>
    );
};
