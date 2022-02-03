import React, { useState, useContext, useEffect } from "react";
// import { getAllBooks, clearBooks, addBook, updateBook, deleteBook, getBookById } from '../operations/bookOperations/book-operations'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Book, PreviewBook } from "../models/models";
import { Button, Modal } from 'native-base'
import { v4 as uuid } from 'uuid';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from "../../App";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from "../components/Header";
import { useBooks } from "../hooks/useBooks";
import { getAllData } from "../operations/asyncStoreOperations/asyncStore-operations";
// add book
// delete book
// edit book
// modal

import { clearData } from "../operations/asyncStoreOperations/asyncStore-operations";

//render books

const BookScreen = ({ navigation }: any) => {
    const { previewBooks, addBook, deleteBook, updateBook } = useBooks()

    const [clickedBook, setClickedBook] = useState<PreviewBook>({id: '', name: '', author: ''})

    const [inputBook, setInputBook] = useState<Book>({id:'', name: '', author: '' })

    const [isModalOpened, setIsModalOpened] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    const [isBookOptionsEnabled, setIsBookOptionsEnabled] = useState(false)

    const contextThemes = useContext<any>(ThemeContext)

    const emptyBook = {id:'', name: '', author: '' }


    return (
        <LinearGradient colors={[contextThemes.currentTheme.gradientColor1.color, contextThemes.currentTheme.gradientColor2.color]} style={contextThemes.currentTheme.mainContainer}>
            <Header navigation={navigation} isBackButtonShown={false} isOptionsShown={true} title='Books' />

            <Button onPress={() => clearData()}>clear data</Button>
            <Button >do something</Button>
            {previewBooks && previewBooks.length === 0 && <View style={contextThemes.currentTheme.emptyView}>
                <Text style={contextThemes.currentTheme.emptyText}>Are you ready to Quote your journey?</Text>
            </View>}
            <ScrollView>
                {
                    previewBooks && previewBooks.length > 0 && previewBooks?.map((book, index) => {

                        return (
                            <View key={index} style={contextThemes.currentTheme.bookItemContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("QuoteScreen", { book })
                                    }}
                                    onLongPress={() => {
                                        setClickedBook(book)
                                        isBookOptionsEnabled ?
                                            clickedBook === book &&
                                            setIsBookOptionsEnabled(false)
                                            : setIsBookOptionsEnabled(true)

                                    }}
                                    delayLongPress={300}
                                    style={contextThemes.currentTheme.bookContainer}
                                >
                                    {/* <View style={contextThemes.currentTheme.bookIcon}><Icon name='book' size={90} color={contextThemes.currentTheme.bookIconColor.color} /></View> */}
                                    <Image style={{ width: 80, height: 80 }} source={require('../assets/demobook/demobook-idle.png')}></Image>
                                    <Text style={contextThemes.currentTheme.bookTitle}>{book.id}</Text>
                                    <Text style={contextThemes.currentTheme.bookTitle}>{book.name}</Text>
                                    <Text style={contextThemes.currentTheme.bookAuthor}>{book.author}</Text>
                                </TouchableOpacity>
                                {isBookOptionsEnabled && book.id === clickedBook.id && <View style={contextThemes.currentTheme.flexRow}>
                                    <Button
                                        onPress={() => {
                                            setIsEditing(true)
                                            setIsModalOpened(true)


                                            setInputBook(book)
                                        }}
                                        style={contextThemes.currentTheme.optionsButton}><Icon name='pencil' size={25} color="white"></Icon></Button>

                                    <Button onPress={async () => {
                                        // removeBook(book.id)
                                        // setIsBookOptionsEnabled(false)
                                        book.id && await deleteBook(book.id)
                                    }}
                                        style={contextThemes.currentTheme.optionsButton}><Icon name='trash' size={25} color="white"></Icon></Button>
                                </View>
                                }
                            </View>
                        )
                    })
                }


                <Modal closeOnOverlayClick={true} isOpen={isModalOpened}>
                    <Modal.Content>
                        <View style={contextThemes.currentTheme.modal}>
                            <View style={contextThemes.currentTheme.iconTextInput}>
                                <Icon name='book' size={25} color="white" />
                                <TextInput style={contextThemes.currentTheme.textInput} placeholder='Book Name' multiline={true} numberOfLines={2} autoFocus={true} value={inputBook.name} onChangeText={(name) => setInputBook({ ...inputBook, name: name })}></TextInput>
                            </View>
                            <View style={contextThemes.currentTheme.iconTextInput}>
                                <Icon name='person' size={25} color="white" />
                                <TextInput style={contextThemes.currentTheme.textInput} placeholder='Author' multiline={true} numberOfLines={2} value={inputBook.author} onChangeText={(author) => setInputBook({ ...inputBook, author: author })}></TextInput>
                            </View>
                            <View style={contextThemes.currentTheme.flexRow}>
                                <Button
                                    onPress={async () => {
                                        if (inputBook.name !== '' || inputBook.author !== '') {
                                            isEditing ?

                                                //    updateBook(clickedBook.id, { ...clickedBook, name: inputBook.name, author: inputBook.author, id: clickedBook.id })
                                                //   :
                                                //    addBook(uuid(), { name: inputBook.name, author: inputBook.author, quotes: [] })
                                                await updateBook({ id: clickedBook.id as string, name: inputBook.name, author: inputBook.author})
                                                :
                                                await addBook({ name: inputBook.name, author: inputBook.author })
                                            setIsModalOpened(false)
                                            setIsEditing(false)

                                            //setIsEditing(false)

                                            setInputBook(emptyBook)
                                        }
                                    }}
                                    style={contextThemes.currentTheme.optionsButton}
                                />
                                {/* {isEditing ? <Icon name='pencil' size={25} color="white" /> : <Icon name='checkmark-sharp' size={25} color="white" />}</Button> */}

                                <Button
                                    onPress={() => {
                                        setIsModalOpened(false)
                                        setInputBook(emptyBook)
                                    }}
                                    style={contextThemes.currentTheme.optionsButton}
                                >
                                    <Icon name='close' size={25} color="white" />
                                </Button>
                            </View>
                        </View>
                    </Modal.Content>
                </Modal>


                <View style={contextThemes.currentTheme.emptyScrollView}></View>
            </ScrollView>
            <Button onPress={() => {
                setIsModalOpened(true)
            }} style={contextThemes.currentTheme.addButton}>
                <Icon name='add' size={40} color="white" />
            </Button>
        </LinearGradient>
    )

}


export default BookScreen