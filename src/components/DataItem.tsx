import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../utils/genericStyles';

export const DataItem = (props: { title: string; value: string }) => {
    const { title, value } = props;
    return (
        <View style={styles.container}>
            <Text style={globalStyles.titleText}>{title}</Text>
            <Text style={globalStyles.titleText}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexShrink: 1, flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 25 },
});
