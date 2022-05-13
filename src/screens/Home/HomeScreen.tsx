import { Text, Image, ScrollView } from 'react-native';
import React from 'react';
import MenuOption from '../../components/MenuOption';
import { useNavigation } from '@react-navigation/native';
import { LightSaberSeparator } from '../../components/LightSaberSeparator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <Text style={{ fontSize: 36, textAlign: 'center', color: textColor }}>Star Wars</Text>

            <ScrollView style={{ flex: 1 }}>
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
                        textColor={textColor}
                        onPress={() => navigation.navigate('PlanetsHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={{ flexShrink: 1, backgroundColor: 'black' }}
                                source={require(shipFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="Ships"
                        textColor={textColor}
                        onPress={() => navigation.navigate('ShipsHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={{ flexShrink: 1, backgroundColor: 'black' }}
                                source={require(peopleFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="People"
                        textColor={textColor}
                        onPress={() => navigation.navigate('PeopleHome')}
                    />
                    <LightSaberSeparator />
                    <MenuOption
                        img={
                            <Image
                                style={{ flexShrink: 1, backgroundColor: 'black' }}
                                source={require(filmFilePath)}
                                height={150}
                                width={150}
                                resizeMethod="resize"
                                resizeMode="contain"
                            />
                        }
                        title="Films"
                        textColor={textColor}
                        onPress={() => navigation.navigate('FilmsHome')}
                    />
                </>
            </ScrollView>
        </SafeAreaView>
    );
};
