import { Quote } from '../../models/models';
import { getAllBooks, getBookById, clearBooks, updateBook, deleteBook } from '../bookOperations/book-operations';

export const getAllQuotesByBookId = async (bookId: string) => {
    try {
        let book = await getBookById(bookId)
        let quotes = book?.quotes
        return quotes
    }
    catch (e) {
        console.log('Could not get quotes')
    }
}

export const getQuoteById = async (bookId: string, id: string) => {
    let allQuotes = await getAllQuotesByBookId(bookId)
    let quote = {}
    if (allQuotes) {
        for (let q of allQuotes) {
            if (q.id === id) {
                quote = q
                break
            }
        }
    }
    return quote
}

export const addQuote = async (bookId: string, id: string, value: any) => {
    let book = await getBookById(bookId)
    book?.quotes?.push({ ...value, id: id })
    if (book) updateBook(bookId, book)
}

export const updateQuote = async (bookId: string, id: string, value: any) => {
    let book = await getBookById(bookId)
    let newQuotes: Quote[] = []
    if (book?.quotes) {
        for (let q of book.quotes) {
            if (q.id === id) {
                newQuotes.push({ ...value, id: id})
            }
            else newQuotes.push(q)
        }
        updateBook(bookId,{...book, quotes: newQuotes})
    }
}

export const deleteQuote = async (bookId: string, id: string) =>{
    let book = await getBookById(bookId)
    let quotes = await getAllQuotesByBookId(bookId)
    let newQuotes = []
    if (quotes) {
        for (let q of quotes) {
            if (q.id !== id) {
                newQuotes.push(q)
            }
        }
        updateBook(bookId, { ...book, quotes: newQuotes })
    }
}