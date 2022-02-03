/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
// import { getAllBooks, clearBooks, updateBook, deleteBook, getBookById } from './operations/bookOperations/book-operations';
import { addQuote, deleteQuote, getAllQuotesByBookId, getQuoteById, updateQuote } from './src/operations/quoteOperations/quote-operations';
import { addData, getAllData, clearData } from './src/operations/asyncStoreOperations/asyncStore-operations'
import { Book, Quote } from './src/models/models';
import { v4 as uuid } from 'uuid';
import GoogleButton from './src/authentication/googleAuth'
import firestore from '@react-native-firebase/firestore';
import BookScreen from './src/screens/booksScreen';
import QuoteScreen from './src/screens/quoteScreen';
import { NativeBaseProvider } from 'native-base'
import { DreamyBrownTheme } from './themes/themes';
import { useThemes } from './themes/useThemes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

//  let options = { theme: 'light', isPaid: false }
//  let updateId: string = 'KOKOKOLEDA38291371'
//  let updateTestBook: Book = { id: 'KOKOKOLEDA38291371', name: 'name', author: 'author', quotes: [{id: '123', quote: 'hello', person: 'az', bookId: updateId}, {id: '1234', quote: 'hello', person: 'az', bookId: updateId}] }
//  let testQuote: Quote = {id: 'KLEOPATRATA', quote: 'KLEOPATRATA', person: 'az', bookId: updateId}

export const ThemeContext = createContext({
  currentTheme: DreamyBrownTheme,
  changeTheme: (themeName: string) => { },
});

const Stack = createNativeStackNavigator();

const App = () => {



  const { currentThemeName, currentTheme, changeTheme } = useThemes()

  const contextThemes = useContext(ThemeContext)

  useEffect(() => {
    contextThemes.currentTheme = currentTheme
  }, [currentTheme])

  return (
    <NativeBaseProvider>
      <ThemeContext.Provider value={{ currentTheme: currentTheme, changeTheme: changeTheme }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BookScreen"
              component={BookScreen}
              options={({ navigation }) => ({
                headerShown: false,
                headerTitle: 'Books',
                headerTitleStyle: { color: 'white' },
                headerStyle: { backgroundColor: contextThemes.currentTheme.headerColor.color }
              })} />
            <Stack.Screen
              name="QuoteScreen"
              component={QuoteScreen}
              options={({navigation})=>({
                headerShown: false,
                headerTitle: 'Quotes',
                headerTitleStyle: { color: 'white' },
                headerStyle: { backgroundColor: contextThemes.currentTheme.headerColor.color }
              })} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
