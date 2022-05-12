import { View, useColorScheme, FlatList, TouchableHighlight } from 'react-native';
import React from 'react';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { AllPeopleQueryResult, Planet } from '../../__generated__/graphql';
import { ListItem } from '@rneui/themed';

export const PlanetsHomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const { data, loading }: QueryResult<Planet> = useQuery(gql`
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
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
        >
            <FlatList
                data={data?.allPlanets?.edges}
                renderItem={({ item: edge }) => (
                    <ListItem Component={TouchableHighlight} key={edge?.node?.id}>
                        <ListItem.Content>
                            <ListItem.Title>{edge?.node?.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
};
