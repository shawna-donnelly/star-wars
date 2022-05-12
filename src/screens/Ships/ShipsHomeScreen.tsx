import { View, useColorScheme, FlatList, TouchableHighlight } from 'react-native';
import React from 'react';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Starship } from '../../__generated__/graphql';
import { ListItem } from '@rneui/themed';

export const ShipsHomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const { data, loading }: QueryResult<Starship> = useQuery(gql`
        {
            allStarships {
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
                data={data?.allStarships?.edges}
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
