import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export interface AttributeItem {

}

export interface DataItem {
    id : String,
    type : String,
    attributes : Object,
    relationships : Object

}

export interface BookStoreListStateItem {
    stores : Array<DataItem>,
    books : Map<String, DataItem> | undefined,
    authors :  Map<String, DataItem> | undefined,
    countries :  Map<String, DataItem> | undefined
}

export interface BookStoreInfoState {
    info : BookStoreListStateItem

}

export const DefaultBookStoreInfoState : BookStoreInfoState = {
    info : {
        stores : [],
        books : undefined,
        authors : undefined,
        countries : undefined
        }


}

export const getBookStoreInfo = createAsyncThunk(
    'bookStoreInfo/getBookStoreInfo',
    async () => {
    const res : BookStoreInfoState = await fetch('http://localhost:3000/stores').then( (data) => 
        data.json()
    ).then( (jsonData) => {

        const booksMap = new Map<String, DataItem>()
        const authorsMap = new Map<String, DataItem>()
        const countriesMap = new Map<String, DataItem>()

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
 
 
        return (
            {
                info : {
                stores : jsonData.data,
                books : booksMap,
                authors : authorsMap,
                countries : countriesMap
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
        state = action.payload
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