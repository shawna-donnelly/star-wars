import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { textColor } from '../screens/Home/HomeScreen';

export const DataItem = (props: { title: string; value: string }) => {
    const { title, value } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.titleText}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexShrink: 1, flexDirection: 'row', paddingHorizontal: 25 },
    titleText: { color: textColor },
});
