import { Book, Quote } from '../../models/models';
import { getAllBooksOperation, getBookByIdOperation, clearBooksOperation, updateBookOperation, deleteBookOperation } from '../bookOperations/book-operations';

export const getAllQuotesByBookId = async (bookId: string) => {
    try {
        let book = await getBookByIdOperation(bookId)
        let quotes = book?.quotes
        return quotes
    }
    catch (e) {
        console.log('Could not get quotes')
    }
}

export const getQuoteById = async (book: Book,quoteId: string) => {
    let allQuotes = book.quotes
    let quote = allQuotes?.filter(q=>q.id!==quoteId)
    return quote
}

export const addQuote = async (books: Book[]) => {
   
    await updateBookOperation(books)
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