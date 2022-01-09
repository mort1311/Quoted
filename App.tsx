/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, { useEffect, useState, createContext } from 'react';
 import { Button, SafeAreaView, Text, View } from 'react-native';
 import { getAllBooks, clearBooks, updateBook, deleteBook, getBookById } from './operations/bookOperations/book-operations';
 import { addQuote, deleteQuote, getAllQuotesByBookId, getQuoteById, updateQuote } from './operations/quoteOperations/quote-operations';
 import { addData, getAllData, clearData } from './operations/asyncStoreOperations/asyncStore-operations'
 import { Book, Quote } from './models/models';
 import { v4 as uuid } from 'uuid';
 import GoogleButton from './authentication/googleAuth'
 import firestore from '@react-native-firebase/firestore';
 
 let options = { theme: 'light', isPaid: false }
 let updateId: string = 'KOKOKOLEDA38291371'
 let updateTestBook: Book = { id: 'KOKOKOLEDA38291371', name: 'name', author: 'author', quotes: [{id: '123', quote: 'hello', person: 'az', bookId: updateId}, {id: '1234', quote: 'hello', person: 'az', bookId: updateId}] }
 let testQuote: Quote = {id: 'KLEOPATRATA', quote: 'KLEOPATRATA', person: 'az', bookId: updateId}
 
 export const BooksContext = createContext({
   books: [{}],
   setBooks: (books: Book[]) => {}
 })
 
 const App = () => {
 
   const [books, setBooks] = useState<Book[]>([])
 
   useEffect(() => {
     const initialLoad = async () => {
       console.log('initial empty', await getAllBooks())
       const initialBooks = await getAllBooks()
       if (!initialBooks) {
         await addData("books", [])
         await addData("options", options)
       }
 
       let allBooks = await getAllBooks()
 
       setBooks(allBooks)
       console.log('store', allBooks)
     }
     initialLoad()
   }, [])
 
   const setNewBooks = (books : Book[]) => {
     setBooks(books)
   }
 
   useEffect(()=>{
    console.log('books')
   }, [books])
 
   return (
     <BooksContext.Provider value={{books: books, setBooks: setNewBooks}}>
     <SafeAreaView>
       <Text> async storage test</Text>
       <Button title='addBook' onPress={async () => {
         //let currentBooks = (await getAllData()).books
         let currentBooks = books
         await addData('books',
           [...currentBooks,
           {
             id: uuid() as string,
             name: 'name',
             author: 'author',
             quotes: [{ id: uuid() as string, quote: 'quote' }, { id: uuid() as string, quote: 'quote' }]
           }])
         //setBooks(await getAllBooks())
       }}></Button>
       <Button title='updateBook' onPress={async () => {
         await updateBook(updateId, updateTestBook)
         setBooks(await getAllBooks())
       }}></Button>
       <Button title='delete book'
         onPress={async () => {
           await deleteBook(updateId)
           setBooks(await getAllBooks())
         }}
       ></Button>
       <Button title='get book by id'
         onPress={async () => {
           let book = await getBookById(updateId)
           console.log('allData', book)
         }}
       ></Button>
       <Button title='getAllBooks'
         onPress={async () => {
           let allData = await getAllData()
           let allBooks = await getAllBooks()
           console.log('allData', allData)
         }}
       ></Button>
       <Button title='ClearBooks'
         onPress={async () => {
           await clearBooks()
         }}
       ></Button>
       <Button title='DELETE ALL'
         onPress={async () => {
           await clearData()
         }}
       ></Button>
       <Button title='get all quotes of book'
         onPress={async () => {
           let quotes = await getAllQuotesByBookId(updateId)
           console.log('quotes', quotes)
         } }
       ></Button>
       <Button title='get quote by id'
         onPress={async () => {
           let quote = await getQuoteById(updateId, '123')
           console.log('quote by id', quote)
         } }
       ></Button>
       <Button title='add quote'
         onPress={async () => {
           let quote = await addQuote(updateId, uuid(), testQuote)
         } }
       ></Button>
             <Button title='update quote'
         onPress={async () => {
           await updateQuote(updateId, '123', testQuote)
         } }
       ></Button>
             <Button title='delete quote'
         onPress={async () => {
           await deleteQuote(updateId, '123')
         } }
       ></Button>
 
       <GoogleButton></GoogleButton>
       <Button title='get firestore data'
         onPress={async () => {
          const usersCollection = firestore().collection('users').doc('jpb8Ft3o502STnWsTBEn').onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
          });
          
          console.log('userCollection',usersCollection)
         } }
       ></Button>
     <Button title='add document' 
      onPress={() => {
        console.log('asdkj')
        firestore().collection('users').add({email:'nasko@.com', books: books})
        console.log('askdjl')
      }}
     ></Button>
     </SafeAreaView>
     </BooksContext.Provider>
   );
 };
 
 export default App;
 