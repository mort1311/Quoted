import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book } from '../../models/models';


export const getAllData = async () => {
    let books: any = [];
    let options = {};
    
    let keys = await AsyncStorage.getAllKeys();
    console.log( 'keys', keys)
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
   // let jsonData = JSON.parse(data)
   console.log('adll data', data.books)
    return data
}


export const getDataById = async (key: string) => {
    let data;
    data = await AsyncStorage.getItem(key);
    let jsonData = JSON.parse(data as string) 
    return jsonData
}

export const addData = async (key: string, value: any) => {
    let stringifiedValue = JSON.stringify(value)
   await AsyncStorage.setItem(key, stringifiedValue)
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