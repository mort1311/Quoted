import * as operations from '../operations/bookOperations/book-operations'
import React, { useState, useEffect } from 'react'
import { Book, PreviewBook } from '../models/models'
import { v4 as uuid } from 'uuid';

export const useBooks = () => {

    const [orderIdNumber, setOrderIdNumber] = useState(0);
    const [previewBooks, setPreviewBooks] = useState<PreviewBook[]>([])


    useEffect(()=>{
        loadPreviewBooks();
    },[])

    const loadPreviewBooks = async () =>{
        const loadedPreviewBooks = await operations.getPreviewBooksOperation();
        if(loadedPreviewBooks){
        let lastBookId: string = loadedPreviewBooks[loadedPreviewBooks.length-1].id;
        let lastOrderIdNumber = lastBookId.substring(5);
        setOrderIdNumber(parseInt(lastOrderIdNumber)+1);
        }
        setPreviewBooks(loadedPreviewBooks);
    }

    const addBook = async (book: any) => {
        const generatedId = 'book-'+orderIdNumber.toString();
        let newBook: Book = {...book, id: generatedId, quotes: []}
        await operations.addBookOperation(newBook)
        
        setPreviewBooks([...previewBooks,{...book, id: generatedId}])
        setOrderIdNumber(orderIdNumber+1);
    }

    const deleteBook = async (bookId: string) => {
        const newBooks = previewBooks.filter(book=> book.id!==bookId);
        await operations.deleteBookOperation(bookId);
        setPreviewBooks(newBooks);
    }

    const updateBook = async (book: PreviewBook) => {
        
        const newBooks = previewBooks.map((b)=> {
            if(b.id===book.id) return book
            else return b
        } )

        await operations.updateBookOperation(book)
        setPreviewBooks(newBooks)
    }

    return {previewBooks, setPreviewBooks, addBook, deleteBook, updateBook}

}