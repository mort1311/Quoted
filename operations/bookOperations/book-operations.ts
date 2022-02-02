import { getAllData, getDataById, addData, updateData, removeData } from '../asyncStoreOperations/asyncStore-operations'
import { Book } from '../../models/models'


export const getAllBooksOperation = async () => {
    //TODO: use state instead of a call
    let asyncStorageData= await getAllData()
    let books = asyncStorageData.books
    console.log('getallbooksoperation', books)
    return books;
}

export const getBookByIdOperation = async (id: string) => {
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

export const addBookOperation = async (allBooks: Book[], book: Book) => {
    //let allBooks: Book[] = await getAllBooksOperation()
    console.log('operation add 1')
    await addData(`${book.id}`, book)
    console.log('operation add 2')
   // await addData('books', [...allBooks, book])
}

export const updateBookOperation = async (id: string, book: Book) => {
  //  await addData('books', books)
  try{
  await updateData(id, book)}
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