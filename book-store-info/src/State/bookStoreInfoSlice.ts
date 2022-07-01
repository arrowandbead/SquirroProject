import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export interface AttributeItem {

}

export interface DataItem {
    id : String,
    type : String,
    attributes : any,
    relationships : any

}

export interface BookItem {
    id : String,
    name : String,
    copiesSold : Number,
    authorName : String
}

export interface BookStoreListStateItem {
    stores : Array<DataItem>,
    books : Map<String, DataItem> | undefined,
    authors :  Map<String, DataItem> | undefined,
    countries :  Map<String, DataItem> | undefined
    topBooks : Map<String, BookItem[]> | undefined
}

export interface BookStoreInfoState {
    info : BookStoreListStateItem

}

export const DefaultBookStoreInfoState : BookStoreInfoState = {
    info : {
        stores : [],
        books : undefined,
        authors : undefined,
        countries : undefined,
        topBooks : undefined
        }


}

const compareBooks = (arg1 : BookItem, arg2 : BookItem) => {
    return (arg1.copiesSold > arg2.copiesSold) ? true : false 
}

const findTwoBiggest  = <Type>(inputList : Type[], compareFunc : (arg1 : Type, arg2 : Type) => boolean) => {
    if (inputList.length < 3) {
        return inputList
    }
    let biggest : Type | undefined = undefined
    let secondBiggest : Type | undefined = undefined
    inputList.forEach(item => {
        if (biggest === undefined) {
            biggest = item
        } else if (secondBiggest === undefined) {
            secondBiggest = item
        } else if (compareFunc(item, secondBiggest)) {
            secondBiggest = item
        }

        if (secondBiggest !== undefined) {
            if(compareFunc(secondBiggest, biggest)) {
                secondBiggest = [biggest, biggest = secondBiggest][0];
            }
        }
    })
    const outputList : Type[] = []
    if (biggest !== undefined) {
        outputList.push(biggest)
    }
    if (secondBiggest !== undefined) {
        outputList.push(secondBiggest)
    }
    return outputList
}

export const getBookStoreInfo = createAsyncThunk(
    'bookStoreInfo/getBookStoreInfo',
    async () => {
    const res : BookStoreInfoState = await fetch(process.env.REACT_APP_REQUEST_BASE_URL! + process.env.REACT_APP_API_PORT! + '/stores').then( (data) => 
        data.json()
    ).then( (jsonData) => {

        const booksMap = new Map<String, DataItem>()
        const authorsMap = new Map<String, DataItem>()
        const countriesMap = new Map<String, DataItem>()
        const topBooksMap = new Map<String, BookItem[]>()

        jsonData.included.forEach((obj : DataItem) => {

            switch(obj.type) {
                case 'books':
                    booksMap.set(obj.id, obj)
                    break
                case 'countries':
                    countriesMap.set(obj.id, obj)
                    break
                case 'authors':
                    authorsMap.set(obj.id, obj)
                    break
                default :
                    throw new Error("Improper type for data object detected")
            }
        })

        jsonData.data.forEach((obj : DataItem) => {
            const bookList : BookItem[] = []
            if (obj.relationships.books){
                obj.relationships.books.data.forEach( (b : any) => {
                    const bookID = b.id
                    const bookObject = booksMap.get(bookID)
                    const bookName = bookObject!.attributes.name
                    const copiesSold = bookObject!.attributes.copiesSold
                    const authorID = bookObject!.relationships.author.data.id
                    const authorName = authorsMap.get(authorID)?.attributes.fullName
                    const newBookItem = {
                        id : bookID,
                        name : bookName,
                        copiesSold : copiesSold,
                        authorName : authorName
                    }
                    bookList.push(newBookItem)
                })
            }
            const twoBiggest = findTwoBiggest(bookList, compareBooks)
            topBooksMap.set(obj.id, twoBiggest)
        })
 
 
        return (
            {
                info : {
                stores : jsonData.data,
                books : booksMap,
                authors : authorsMap,
                countries : countriesMap,
                topBooks : topBooksMap
                }

            })
        }
    ).catch( (error) => {
        console.log(error)
        return DefaultBookStoreInfoState
    })
    return res as BookStoreInfoState
  })

export const bookStoreInfoSlice = createSlice({
  name: "bookStoreInfo",
  initialState: DefaultBookStoreInfoState,
  reducers: {
    setBookStoreInfo: (state, action) => {
        state.info = action.payload
    }
  },
  extraReducers: (builder) => {
        builder.addCase(getBookStoreInfo.fulfilled, (state : any, { payload } : any) => {
            state.info = payload.info
        })
  },
});

// Action creators are generated for each case reducer function
export const { setBookStoreInfo } = bookStoreInfoSlice.actions;

export default bookStoreInfoSlice.reducer;