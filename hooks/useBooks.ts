import * as operations from '../operations/bookOperations/book-operations'
import React, { useState, useEffect } from 'react'
import { Book } from '../models/models'
import { v4 as uuid } from 'uuid';

export const useBooks = () => {

    const [books, setBooks] = useState<Book[]>([])
    const [orderIdNumber, setOrderIdNumber] = useState(0);

    useEffect(()=>{
        loadAllBooks()
    },[])

    useEffect(()=>{
        console.log('new book use effect');
    })
    const loadAllBooks = async () => {
        const loadedBooks = await operations.getAllBooksOperation()
        let lastBookId: string = loadedBooks[loadedBooks.length-1].id;
        let lastOrderIdNumber = lastBookId.substring(5)
        console.log('lastOrderIdNumber', lastOrderIdNumber)
        setOrderIdNumber(parseInt(lastOrderIdNumber)+1);
        console.log('books loaded');
        setBooks(loadedBooks)
    }

    const addBook = async (book: Book) => {
        console.log('usebooks add')
        let newBook = {...book,id:'book-'+orderIdNumber.toString()}
        await operations.addBookOperation(books,newBook)
        console.log('usebooks add 2')
        setOrderIdNumber(orderIdNumber+1);
        setBooks([...books,newBook])
    }

    const deleteBook = async (bookId: string) => {

        const newBooks = books.filter((b)=> b.id!==bookId)
        await operations.deleteBookOperation(bookId)
        setBooks(newBooks)
    }

    const updateBook = async (book: Book) => {
        const newBooks = books.map((b)=> {
            if(b.id===book.id) return book
            else return b
        } )
        await operations.updateBookOperation(book.id as string, book)
        setBooks(newBooks)
    }

    return {books, addBook, deleteBook, updateBook, setBooks}

}