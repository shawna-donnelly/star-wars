import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { textColor } from '../utils/genericStyles';

export default function MenuOption(props: { title: string; img?: JSX.Element; onPress: () => void }) {
    const { title, img, onPress } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {img}
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { fontSize: 30, color: textColor },
});
