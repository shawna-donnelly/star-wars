import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Film, Person, Planet, Starship, Vehicle } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PersonMapper, PlanetMapper, StarshipMapper, VehicleMapper } from '../../components/Mappers';

export const FilmDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
    const route = useRoute();
    let { id } = route.params;

    const [vehicles, setVehicles] = useState([] as Vehicle[]);
    const [starships, setStarships] = useState([] as Starship[]);
    const [characters, setCharacters] = useState([] as Person[]);
    const [planets, setPlanets] = useState([] as Planet[]);

    const [film, setFilm] = useState(undefined as unknown as Film);

    const { data, loading } = useQuery<{ film: Film }, any>(gql`
        {
          film(id: "${id}") {
            title
            id
            episodeID
            director
            releaseDate
            openingCrawl
            speciesConnection{
              species{
                id
                name
              }
            }
            starshipConnection{
              starships{
                id
                name
              }
            }
            vehicleConnection{
              vehicles{
                id
                name
              }
            }
            characterConnection{
              characters{
                id
                name
              }
            }
            planetConnection{
              planets{
                id
                name
              }
            }
          }
        }
    `);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.film?.title,
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation, data]);

    useEffect(() => {
        if (data) {
            setFilm(data.film);
        }
    }, [data]);

    useEffect(() => {
        setPlanets(film?.planetConnection?.planets);
        setCharacters(film?.characterConnection?.characters);
        setVehicles(film?.vehicleConnection?.vehicles);
        setStarships(film?.starshipConnection?.starships);
    }, [film]);

    return (
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={film?.title || ''} />
                    </View>
                    <Text style={globalStyles.disclaimerText}>Click on the items below to see more details</Text>

                    <LightSaberSeparator />
                    <PersonMapper data={characters} dataTitle="Characters" />
                    <LightSaberSeparator />
                    <PlanetMapper data={planets} />
                    <LightSaberSeparator />
                    <VehicleMapper data={vehicles} />
                    <LightSaberSeparator />
                    <StarshipMapper data={starships} />
                </>
            )}
        </ScrollView>
    );
};
