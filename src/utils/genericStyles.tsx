import { StyleSheet } from 'react-native';

export const textColor = '#e0d6d6';

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
    globalFlatListContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
});
