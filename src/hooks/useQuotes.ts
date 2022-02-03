import * as operations from '../operations/quoteOperations/quote-operations'
import React, { useEffect, useState } from 'react'
import { Quote, Book, PreviewBook } from '../models/models'
import * as bookOperations from '../operations/bookOperations/book-operations'
import { v4 as uuid } from 'uuid';

export const useQuotes = (book: PreviewBook) => {

    const [quotes, setQuotes] = useState<Quote[]>([])
    const [bookData, setBookData] = useState<Book>({id:'',name:'',author:'', quotes:[]});

    useEffect(() => {
        loadAllQuotes(book)
    }, [])

    const loadAllQuotes = async (book: PreviewBook) => {
        const loadedBook: Book = await bookOperations.getBookByIdOperation(book.id)
        setBookData(loadedBook)
        if (loadedBook.quotes) setQuotes(loadedBook.quotes);
    }

    const addQuote = async (quote: {quote: string, person: string}) => {
        const newQuote = {...quote, id: uuid(), bookId: book.id }
        console.log('add quote new quote', newQuote)
        const newQuotes = [...quotes, newQuote]
        setQuotes(newQuotes)
        updateBookHelper(newQuotes)
       
    }

    const deleteQuote= async (id: string) => {
        const newQuotes = quotes.filter(q=>q.id!==id)
        setQuotes(newQuotes)
        updateBookHelper(newQuotes)
    }

    const updateQuote = async (quote: Quote) => {
        const newQuotes = quotes.map(q=>{
            if(q.id===quote.id) return quote;
            return q;
        })
        setQuotes(newQuotes);
        updateBookHelper(newQuotes);

    }

    const updateBookHelper = async (newQuotes: Quote[]) => {
        let newBook = { ...book, quotes: newQuotes }
        try {
            await bookOperations.updateBookOperation(newBook)
        } catch {
            console.log('couldnt add quote')
        }
    }

    return { quotes, addQuote, deleteQuote, updateQuote }

}