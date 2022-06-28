import React, {useEffect} from 'react';
import { createUseStyles } from 'react-jss';
import BookStorePanel from './BookStorePanel';
import { useSelector} from "react-redux";
import { DataItem } from "../State/bookStoreInfoSlice"

const styles = createUseStyles({
    Outer : {
        minWidth : "600px",
        width : "80vw",
        backgroundColor : "tan",
        height : "100vh",
        display: "-webkit-box",
        overflow : "scroll",

        alignItems : "center",
        justifyContent : "center",
        "-webkit-box-orient" : "vertical",

    },
    Inner : {
        display : 'flex',
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    }
  });


const BookStoreList = () => {
    const classes = styles()
    const {info} = useSelector((state : any) => state.bookStoreInfo)

    return (
        <div className={classes.Outer}>
            <div className={classes.Inner}>
                {info.stores.map((thing : DataItem, index : number ) => {
                    return (
                        <BookStorePanel 
                            key={index}
                            index={index} 
                        />                )
                })}
                
            </div>
            
        </div>
    )
}

export default BookStoreList;