import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../../models/models';


export const getAllData = async () => {
    let books: any = [];
    let options = {};
    
    let keys = await AsyncStorage.getAllKeys();

  
    await AsyncStorage.multiGet(keys, (err, stores)=>{
        stores?.map((r, i, store)=>{
            let key = store[i][0];
            let value = store[i][1];
            let jsonValue = JSON.parse(value as string)
            if(key.includes('book'))books.push(jsonValue);
            if(key=='options')options=jsonValue;
        })
    })

    let data = { books , options}
   
    return data
}

export const getPreviewBooksData = async () => {
    const previewBooks: any = [];
    
    let keys = await AsyncStorage.getAllKeys();
    
    const bookKeys = keys.filter(key => key.includes('book'))
    
    const sortedKeys = quickSortBooks(bookKeys);

    await AsyncStorage.multiGet(sortedKeys, (err, stores)=>{
        stores?.map((r, i, store)=>{
            let key = store[i][0];
            let value = store[i][1];
            let jsonValue: Book = JSON.parse(value as string)
            previewBooks.push({id:jsonValue.id, name: jsonValue.name, author: jsonValue.author});
        })
    })

    return previewBooks;
}


export const getDataById = async (key: string) => {
    let data;
    data = await AsyncStorage.getItem(key);
    let jsonData = JSON.parse(data as string) 
    return jsonData
}

export const addData = async (key: string, value: any) => {
    let stringifiedValue = JSON.stringify(value)
try{
   await AsyncStorage.setItem(key, stringifiedValue)
   }catch{
       throw console.error('couldnt set item');
       
   }
}

export const updateData = async (key: string, value: any) => {

    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const removeData = async (key: string) => {
    await AsyncStorage.removeItem(key)
}

export const clearData = async () =>{
    await AsyncStorage.clear()
}

const quickSortBooks = (arr: string[], length = arr.length - 1, start = 0): any => {

    if (arr.length < 2) return arr // base case

    const pivot = arr[arr.length - 1]; //pivot value
    const left = [ ];  // left handside array
    const right = [ ]; // right handside array

    const pivotNumber = parseInt(pivot.substring(5))

   while (start < length) {  // comparing and pushing
        if (parseInt(arr[start].substring(5)) < pivotNumber){
          left.push(arr[start])
        }
        else {
          right.push(arr[start])
        }
       start++ //  incrementing start value
    }
            // calling quick sort recursively
    return [...quickSortBooks(left), pivot, ...quickSortBooks(right)];
}