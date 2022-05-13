import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Film, Maybe, Person, Starship, Vehicle } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FilmMapper, StarshipMapper, VehicleMapper } from '../../components/Mappers';
import { RootStackParamList } from '../../navigation/Navigation';

export const PersonDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PersonDetail'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'PersonDetail'>>();
    let { id } = route.params;

    const [films, setFilms] = useState([] as Maybe<Film>[]);
    const [vehicles, setVehicles] = useState([] as Maybe<Vehicle>[]);
    const [starships, setStarships] = useState([] as Maybe<Starship>[]);
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
        if (person?.filmConnection?.films) {
            setFilms(person?.filmConnection?.films);
        }
        if (person?.vehicleConnection?.vehicles) {
            setVehicles(person?.vehicleConnection?.vehicles);
        }
        if (person?.starshipConnection?.starships) {
            setStarships(person?.starshipConnection?.starships);
        }
    }, [person]);

    return (
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={person?.name || ''} />
                        <DataItem title="Birth Year:" value={person?.birthYear || ''} />
                        <DataItem title="Gender:" value={person?.gender || ''} />
                        <DataItem title="Mass:" value={person?.mass?.toString() || ''} />
                    </View>
                    <Text style={globalStyles.disclaimerText}>Click on the items below to see more details</Text>
                    <TouchableOpacity
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('PlanetDetail', { id: person?.homeworld?.id || '' })}
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
