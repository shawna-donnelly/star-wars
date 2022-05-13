import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Film, Maybe, Person, Planet, Starship, Vehicle } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles, textColor } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PersonMapper, PlanetMapper, StarshipMapper, VehicleMapper } from '../../components/Mappers';
import { RootStackParamList } from '../../navigation/Navigation';

export const FilmDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'FilmDetail'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'FilmDetail'>>();
    let { id } = route.params;

    const [vehicles, setVehicles] = useState([] as Maybe<Vehicle>[]);
    const [starships, setStarships] = useState([] as Maybe<Starship>[]);
    const [characters, setCharacters] = useState([] as Maybe<Person>[]);
    const [planets, setPlanets] = useState([] as Maybe<Planet>[]);

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
            title: data?.film?.title || '',
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
        if (film?.planetConnection?.planets) {
            setPlanets(film?.planetConnection?.planets);
        }
        if (film?.characterConnection?.characters) {
            setCharacters(film?.characterConnection?.characters);
        }
        if (film?.vehicleConnection?.vehicles) {
            setVehicles(film?.vehicleConnection?.vehicles);
        }
        if (film?.starshipConnection?.starships) {
            setStarships(film?.starshipConnection?.starships);
        }
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
                    <PersonMapper data={characters || []} dataTitle="Characters" />
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
