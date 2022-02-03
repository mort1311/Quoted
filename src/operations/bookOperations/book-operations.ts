import { getAllData, getDataById, addData, updateData, removeData, getPreviewBooksData } from '../asyncStoreOperations/asyncStore-operations'
import { Book, PreviewBook } from '../../models/models'


export const getAllBooksOperation = async () => {
    //TODO: use state instead of a call
    let asyncStorageData= await getAllData()
    let books = asyncStorageData.books
    console.log('getallbooksoperation', books)
    return books;
}

export const getPreviewBooksOperation = async () => {
    const previewBooks = await getPreviewBooksData();
    return previewBooks;
}

export const getBookByIdOperation = async (id: string) => {
    const book = await getDataById(id);
    return book;
}

export const addBookOperation = async (book: Book) => {

    await addData(book.id, book)
}

export const updateBookOperation = async (book: Book) => {
  //  await addData('books', books)
  try{
  await updateData(book.id, book)}
  catch{
      console.log('error updating book')
  }
}

export const deleteBookOperation = async (id: string) => {
 //   await addData('books', books)
    await removeData(id)
}

export const clearBooksOperation = async () => {
   // await updateData("books", [])
}