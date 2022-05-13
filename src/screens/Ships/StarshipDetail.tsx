import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Film, Maybe, Person, Starship } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FilmMapper, PersonMapper } from '../../components/Mappers';
import { RootStackParamList } from '../../navigation/Navigation';

export const StarshipDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'StarshipDetail'>>();
    const route = useRoute<RouteProp<RootStackParamList, 'StarshipDetail'>>();
    let { id } = route.params;

    const [films, setFilms] = useState([] as Maybe<Film>[]);
    const [pilots, setPilots] = useState([] as Maybe<Person>[]);

    const [starship, setStarship] = useState(undefined as unknown as Starship);

    const { data, loading } = useQuery<{ starship: Starship }, any>(gql`
        {
          starship(id: "${id}") {
            name
            model
            starshipClass
            costInCredits
            pilotConnection{
              pilots{
                id
                name
              }
            }
            filmConnection{
              films{
                id
                title
              }
            }
          }
        }
    `);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data?.starship?.name || '',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation, data]);

    useEffect(() => {
        if (data) {
            setStarship(data.starship);
        }
    }, [data]);

    useEffect(() => {
        if (starship?.pilotConnection?.pilots) {
            setPilots(starship?.pilotConnection?.pilots);
        }
        if (starship?.filmConnection?.films) {
            setFilms(starship?.filmConnection?.films);
        }
    }, [starship]);

    return (
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={starship?.name || ''} />
                        <DataItem title="Model:" value={starship?.model || ''} />
                        <DataItem title="Starship Class:" value={starship?.starshipClass || ''} />
                        <DataItem title="Cost in Credits:" value={starship?.costInCredits?.toString() || ''} />
                    </View>
                    <Text style={globalStyles.disclaimerText}>Click on the items below to see more details</Text>
                    <LightSaberSeparator />
                    <PersonMapper data={pilots} dataTitle="Pilots" />
                    <LightSaberSeparator />
                    <FilmMapper data={films} />
                    <LightSaberSeparator />
                </>
            )}
        </ScrollView>
    );
};
