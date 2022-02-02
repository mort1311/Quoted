import {DreamyBrownTheme, LightTheme} from './themes'
import {useState} from 'react'

export const useThemes = () => {

    const [currentTheme, setCurrentTheme] = useState(DreamyBrownTheme)
    const [currentThemeName, setCurrentThemeName] = useState('DreamyBrown')
    const changeTheme = (themeName: string) => {
        switch(themeName){
            case 'DreamyBrown':
                setCurrentTheme(DreamyBrownTheme)
                setCurrentThemeName('DreamyBrown')
                break
            case 'Light': 
                setCurrentTheme(LightTheme)
                setCurrentThemeName('Light')
                break;
        }
    }

    return {currentTheme, currentThemeName, changeTheme}
}