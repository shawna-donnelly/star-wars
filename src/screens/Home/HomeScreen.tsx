import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import MenuOption from '../../components/MenuOption';
import { useNavigation } from '@react-navigation/native';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles } from '../../utils/genericStyles';

export const textColor = '#e0d6d6';
const planetFilePath = '../../../assets/images/tatooine.png';
const shipFilePath = '../../../assets/images/falcon.png';
const peopleFilePath = '../../../assets/images/jabba.png';
const filmFilePath = '../../../assets/images/georgeLucas.png';

export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => null,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={globalStyles.globalFlatListContainer}>
            <Text style={styles.mainTitle}>Star Wars</Text>

            <ScrollView style={styles.container}>
                <>
                    <MenuOption
                        img={
                            <Image
                                style={{ flexShrink: 1, backgroundColor: 'black' }}
                                source={require(planetFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="Planets"
                        onPress={() => navigation.navigate('PlanetsHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={styles.item}
                                source={require(shipFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="Ships"
                        onPress={() => navigation.navigate('ShipsHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={styles.item}
                                source={require(peopleFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="People"
                        onPress={() => navigation.navigate('PeopleHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={styles.item}
                                source={require(filmFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="Films"
                        onPress={() => navigation.navigate('FilmsHome')}
                    />
                </>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    mainTitle: { fontSize: 36, textAlign: 'center', color: textColor },
    container: { flex: 1 },
    item: { flexShrink: 1, backgroundColor: 'black' },
});
