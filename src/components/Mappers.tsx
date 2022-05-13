import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../utils/genericStyles';
import { Film, Maybe, Person, Planet, Starship, Vehicle } from '../__generated__/graphql';
import { DataItem } from './DataItem';

export const FilmMapper = (props: { data: Maybe<Film>[] }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    const { data } = props;
    return (
        <>
            <Text style={globalStyles.boldTitleText}>Associated Films</Text>
            {data?.map((film: Maybe<Film>) => {
                return (
                    <TouchableOpacity
                        key={film?.id}
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('FilmDetail', { id: film?.id })}
                    >
                        <DataItem title="-" value={film?.title || ''} />
                    </TouchableOpacity>
                );
            })}

            {data?.length === 0 && <DataItem title="" value="No Films" />}
        </>
    );
};

export const StarshipMapper = (props: { data: Maybe<Starship>[] }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    const { data } = props;
    return (
        <>
            <Text style={globalStyles.boldTitleText}>Associated Starships</Text>
            {data?.map((starship: Maybe<Starship>) => {
                return (
                    <TouchableOpacity
                        key={starship?.id}
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('StarshipDetail', { id: starship?.id })}
                    >
                        <DataItem title="-" value={starship?.name || ''} />
                    </TouchableOpacity>
                );
            })}

            {data?.length === 0 && <DataItem title="" value="No Starships" />}
        </>
    );
};

export const PersonMapper = (props: { data: Maybe<Person>[]; dataTitle?: string }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    const { data, dataTitle } = props;
    return (
        <>
            <Text style={globalStyles.boldTitleText}>Associated {dataTitle || 'Persons'}</Text>
            {data?.map((person: Maybe<Person>) => {
                return (
                    <TouchableOpacity
                        key={person?.id}
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('PersonDetail', { id: person?.id })}
                    >
                        <DataItem title="-" value={person?.name || ''} />
                    </TouchableOpacity>
                );
            })}

            {data?.length === 0 && <DataItem title="" value={dataTitle ? `No ${dataTitle}` : 'No Persons'} />}
        </>
    );
};

export const PlanetMapper = (props: { data: Maybe<Planet>[] }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    const { data } = props;
    return (
        <>
            <Text style={globalStyles.boldTitleText}>Associated Planets</Text>
            {data?.map((planet: Maybe<Planet>) => {
                return (
                    <TouchableOpacity
                        key={planet?.id}
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('PlanetDetail', { id: planet?.id })}
                    >
                        <DataItem title="-" value={planet?.name || ''} />
                    </TouchableOpacity>
                );
            })}

            {data?.length === 0 && <DataItem title="" value="No Planets" />}
        </>
    );
};

export const VehicleMapper = (props: { data: Maybe<Vehicle>[] }) => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    const { data } = props;
    return (
        <>
            <Text style={globalStyles.boldTitleText}>Associated Vehicles</Text>
            {data?.map((vehicle: Maybe<Vehicle>) => {
                return (
                    <TouchableOpacity
                        key={vehicle?.id}
                        style={globalStyles.generalDataView}
                        onPress={() => navigation.navigate('VehicleDetail', { id: vehicle?.id })}
                    >
                        <DataItem title="-" value={vehicle?.name || ''} />
                    </TouchableOpacity>
                );
            })}

            {data?.length === 0 && <DataItem title="" value="No Vehicles" />}
        </>
    );
};
