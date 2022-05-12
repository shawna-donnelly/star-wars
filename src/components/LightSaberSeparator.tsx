import { Image } from 'react-native';
import React from 'react';

export const LightSaberSeparator = (props: { width?: number; height?: number }) => {
    const width = props.width ? props.width : 400;
    const height = props.height ? props.height : 50;

    return (
        <Image
            style={{ flexShrink: 1 }}
            source={require('../../assets/images/greenlightsbr.png')}
            width={width}
            height={height}
            resizeMethod="auto"
            resizeMode="stretch"
        />
    );
};
