import { Button } from 'native-base'
import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { ThemeContext } from '../App'
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps{
    navigation: any,
    title: string,
    isBackButtonShown?: boolean,
    isOptionsShown?: boolean
}

const Header = ({ navigation, isBackButtonShown, title, isOptionsShown }: HeaderProps) => {

    const contextThemes = useContext<any>(ThemeContext)

    return (
        <View style={{alignItems:'center', zIndex: 3,top: 0, width: '100%', height:50, flexDirection: 'row', backgroundColor: contextThemes.currentTheme.headerColor.color }}>
            {isBackButtonShown && <Button style={{backgroundColor: 'transparent'}} onPress={() => navigation.goBack()}><Icon name="arrow-back-outline" size={25}/></Button>}
            <Text>{title}</Text>
            {isOptionsShown && <Button onPress={()=>navigation.navigate('OptionsScreen')}>options</Button>}
        </View>
    )
}

export default Header