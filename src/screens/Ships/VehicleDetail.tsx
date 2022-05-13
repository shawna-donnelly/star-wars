import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Film, Person, Vehicle } from '../../__generated__/graphql';
import { gql, useQuery } from '@apollo/client';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { DataItem } from '../../components/DataItem';
import { globalStyles } from '../../utils/genericStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FilmMapper, PersonMapper } from '../../components/Mappers';

export const VehicleDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
    const route = useRoute();
    let { id } = route.params;

    const [films, setFilms] = useState([] as Film[]);
    const [pilots, setPilots] = useState([] as Person[]);

    const [vehicle, setVehicle] = useState(undefined as unknown as Vehicle);

    const { data, loading } = useQuery<{ vehicle: Vehicle }, any>(gql`
        {
          vehicle(id: "${id}") {
            name
            model
            vehicleClass
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
            title: data?.vehicle?.name || '',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation, data]);

    useEffect(() => {
        if (data) {
            setVehicle(data.vehicle);
        }
    }, [data]);

    useEffect(() => {
        setPilots(vehicle?.pilotConnection?.pilots);
        setFilms(vehicle?.filmConnection?.films);
    }, [vehicle]);

    return (
        <ScrollView style={globalStyles.globalScrollView} contentContainerStyle={globalStyles.globalScrollViewContent}>
            {loading && <ActivityIndicator color={textColor} />}
            {data && (
                <>
                    <View style={globalStyles.generalDataView}>
                        <Text style={globalStyles.boldTitleText}>General Information</Text>
                        <DataItem title="Name:" value={vehicle?.name || ''} />
                        <DataItem title="Model:" value={vehicle?.model || ''} />
                        <DataItem title="Starship Class:" value={vehicle?.vehicleClass || ''} />
                        <DataItem title="Cost in Credits:" value={vehicle?.costInCredits?.toString() || ''} />
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
