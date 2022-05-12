import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function MenuOption(props: { textColor: string; title: string; img?: Element; onPress: () => void }) {
    const { textColor, title, img, onPress } = props;

    return (
        <TouchableOpacity
            style={{
                flexShrink: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={onPress}
        >
            {img}
            <Text style={{ fontSize: 30, color: textColor }}>{title}</Text>
        </TouchableOpacity>
    );
}
