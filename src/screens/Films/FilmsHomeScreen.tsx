import { View, useColorScheme, FlatList, TouchableHighlight } from 'react-native';
import React from 'react';
import { gql, QueryResult, useQuery } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Film } from '../../__generated__/graphql';
import { ListItem } from '@rneui/themed';

export const FilmsHomeScreen = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const { data, loading }: QueryResult<Film> = useQuery(gql`
        {
            allFilms {
                edges {
                    node {
                        id
                        title
                    }
                }
            }
        }
    `);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}
        >
            <FlatList
                data={data?.allFilms?.edges}
                renderItem={({ item: edge }) => (
                    <ListItem Component={TouchableHighlight} key={edge?.node?.id}>
                        <ListItem.Content>
                            <ListItem.Title>{edge?.node?.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
};
