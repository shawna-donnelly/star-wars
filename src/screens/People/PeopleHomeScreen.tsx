import { View, useColorScheme, FlatList, TouchableHighlight } from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { AllPeopleQueryResult } from '../../__generated__/graphql';
import { ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export const PeopleHomeScreen = () => {
    const navigation = useNavigation();
    const isDarkMode = useColorScheme() === 'dark';

    const { data, loading }: AllPeopleQueryResult = useQuery(gql`
        {
            allPeople {
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
                data={data?.allPeople?.edges}
                renderItem={({ item: edge }) => (
                    <ListItem
                        Component={TouchableHighlight}
                        key={edge?.node?.id}
                        onPress={() => navigation.navigate('PersonDetail')}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{edge?.node?.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
            />
        </View>
    );
};
