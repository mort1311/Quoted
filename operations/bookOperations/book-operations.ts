import { getAllData, getDataById, addData, updateData, removeData } from '../asyncStoreOperations/asyncStore-operations'
import { Book } from '../../models/models'
import { useContext } from 'react'

export const getAllBooks = async () => {
    //TODO: use state instead of a call
    let books: Book[] = await getDataById('books')
    return books
}

export const getBookById = async (id: string) => {
    let books: Book[] = await getDataById('books')
    if (books) {
        let book: Book = {}
        for (let b of books) {
            if (b.id === id) {
                book = b
                break
            }
        }
        return book
    }
}

export const addBook = async (key: string, value: any) => {
    let allBooks: Book[] = await getAllBooks()
    await addData('books', [...allBooks, { id: key, ...value }])
}

export const updateBook = async (key: string, value: Book) => {
    let allBooks: Book[] = await getAllBooks()
    let bookIndex = 0

    for (let book of allBooks) {
        if (book.id === key) {
            break
        }
        bookIndex++
    }
    let currentBook: Book = value
    allBooks[bookIndex] = { id: currentBook.id, name: currentBook.name, author: currentBook.author, quotes: currentBook.quotes }
    await addData('books', allBooks)
}

export const deleteBook = async (key: string) => {
    let allBooks: Book[] = await getAllBooks()
    let newBooks: Book[] = []

    allBooks.map((book) => {
        if (book.id !== key) {
            newBooks.push(book)
        }
    })

    await addData('books', newBooks)
}

export const clearBooks = async () => {
    await updateData("books", [])
}