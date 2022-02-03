export interface Book {
    id: string,
    name?: string,
    author?: string,
    quotes?: Quote[]
}

export interface PreviewBook {
    id: string,
    name?: string,
    author?: string
}

export interface Quote{
    id: string,
    bookId?: string,
    quote: string,
    comments?: string[],
    person?: string,
    liked?: boolean 
}

export interface Options{
    theme: string,
    isMember: boolean
}