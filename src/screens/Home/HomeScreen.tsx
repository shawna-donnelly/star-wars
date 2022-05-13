import { Text, Image, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import MenuOption from '../../components/MenuOption';
import { useNavigation } from '@react-navigation/native';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { globalStyles, textColor } from '../../utils/genericStyles';
import { hum } from '../../App';
import reactotron from 'reactotron-react-native';

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

    const playSound = () => {
        hum.setNumberOfLoops(0);
        hum.setVolume(0.25);

        hum.play(success => {
            if (success) {
                reactotron.log!('Successfully played the sound');
            } else {
                reactotron.log!('Playback failed due to audio decoding errors');
            }
        });
    };

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
                        onPress={() => {
                            playSound();
                            navigation.navigate('PlanetsHome');
                        }}
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
                        onPress={() => {
                            playSound();
                            navigation.navigate('ShipsHome');
                        }}
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
                        onPress={() => {
                            playSound();
                            navigation.navigate('PeopleHome');
                        }}
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
                        onPress={() => {
                            playSound();
                            navigation.navigate('FilmsHome');
                        }}
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
