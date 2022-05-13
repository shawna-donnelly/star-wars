import { View, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { PlanetsConnection } from '../../__generated__/graphql';
import { ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { textColor } from '../Home/HomeScreen';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const PlanetsHomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'ALL STAR WARS PLANETS',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: textColor },
        });
    }, [navigation]);

    const { data, loading } = useQuery<{ allPlanets: PlanetsConnection }, any>(gql`
        {
            allPlanets {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    `);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'black',
            }}
        >
            {loading && <ActivityIndicator />}
            {data && (
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <FlatList
                        data={data?.allPlanets?.edges}
                        renderItem={({ item: edge }) => (
                            <>
                                <ListItem
                                    containerStyle={{
                                        backgroundColor: 'black',
                                    }}
                                    Component={TouchableHighlight}
                                    key={edge?.node?.id}
                                    onPress={() => navigation.navigate('PlanetDetail', { id: edge?.node?.id })}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title style={{ color: textColor }}>{edge?.node?.name}</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                                <LightSaberSeparator height={10} />
                            </>
                        )}
                    />
                </View>
            )}
        </View>
    );
};
