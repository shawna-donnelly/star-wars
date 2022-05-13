import { StyleSheet } from 'react-native';
import { textColor } from '../screens/Home/HomeScreen';

export const globalStyles = StyleSheet.create({
    globalScrollView: {
        flex: 1,
        backgroundColor: 'black',
    },
    globalScrollViewContent: {
        paddingBottom: '5%',
    },
    generalDataView: {
        flexShrink: 1,
    },
    titleText: {
        color: textColor,
        margin: 5,
        fontSize: 20,
    },
    boldTitleText: {
        color: textColor,
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    disclaimerText: { fontSize: 10, color: textColor, fontStyle: 'italic', fontWeight: '300' },
});
