import * as operations from '../operations/quoteOperations/quote-operations'
import React, { useEffect, useState } from 'react'
import { Quote, Book } from '../models/models'
import * as bookOperations from '../operations/bookOperations/book-operations'

export const useQuotes = (book: Book, books: Book[], setBooks: any) => {

    const [quotes, setQuotes] = useState<Quote[]>([])

    useEffect(() => {
        loadAllQuotes(book)
    }, [])

    

    const loadAllQuotes = (book: Book) => {
        const loadedQuotes = book.quotes
        if (loadedQuotes) setQuotes(loadedQuotes)
    }

    const addQuote = async (book: Book, quote: Quote) => {
        const newQuotes = [...book.quotes as Quote[], quote]
        setQuotes(newQuotes)
        let newBook = { ...book, quotes: newQuotes }

        const newBooks: Book[] = books.map((b)=>{
            if(b.id==book.id) return newBook
            else return b
        })
        setBooks(newBooks)
        console.log('BOOKID', newBook)
        try {
            await bookOperations.updateBookOperation(book.id as string, newBook)
        } catch {
            console.log('couldnt add quote')
        }
       
    }

    const deleteBook = async (bookId: string) => {

        const newBooks = books.filter((b) => b.id !== bookId)
        await operations.deleteBookOperation(newBooks)
        setBooks(newBooks)
    }

    const updateBook = async (book: Book) => {
        const newBooks = books.map((b) => {
            if (b.id === book.id) return book
            else return b
        })
        await operations.updateBookOperation(newBooks)
        setBooks(newBooks)
    }

    return { quotes, addQuote }

}