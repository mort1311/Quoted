import AsyncStorage from '@react-native-async-storage/async-storage';


export const getAllData = async () => {
    let books = await getDataById("books")
    let options = await getDataById("options")
    let data = {books, options}
   // let jsonData = JSON.parse(data)
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
    await addData(key, value)
}

export const removeData = async (key: string) => {
    await AsyncStorage.removeItem(key)
}

export const clearData = async () =>{
    await AsyncStorage.clear()
}