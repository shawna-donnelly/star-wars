import { Image } from 'react-native';
import React from 'react';
import { globalStyles } from '../utils/genericStyles';

export const LightSaberSeparator = (props: { width?: number; height?: number }) => {
    const width = props.width ? props.width : '100%';
    const height = props.height ? props.height : 50;

    return (
        <Image
            style={globalStyles.generalDataView}
            source={require('../../assets/images/greenlightsbr.png')}
            width={width}
            height={height}
            resizeMethod="auto"
            resizeMode="stretch"
        />
    );
};
