import React, {useEffect} from 'react';
import { createUseStyles } from 'react-jss';
import BookStorePanel from './BookStorePanel';
import { useSelector} from "react-redux";
import { DataItem } from "../State/bookStoreInfoSlice"

const styles = createUseStyles({
    ScrollDiv : {
        display: "-webkit-box",
        overflow : "scroll",
        "-webkit-box-orient" : "vertical",
    },
    Inner : {
        minWidth : "600px",
        width : "80vw",
        backgroundColor : "#D3D3D3",
        height : "100vh",
        display : 'flex',
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    },
    Outer : {
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
                <div className={classes.ScrollDiv}>
                    {info.stores.map((thing : DataItem, index : number ) => {
                        return (
                            <BookStorePanel 
                                key={index}
                                index={index} 
                            />                )
                    })}
                </div>
                
            </div>
            
        </div>
    )
}

export default BookStoreList;