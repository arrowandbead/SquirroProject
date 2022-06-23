import React, {useEffect} from 'react';
import { createUseStyles } from 'react-jss';


const styles = createUseStyles({
    Outer : {
        height : "100%",
        width : "100%",
        backgroundColor : "red",
        display : "flex"
    }
  });


const BookStoreList = () => {
    const classes = styles()
    useEffect(() => {

    }, [])
    return (
        <div className={classes.Outer}>
            hi
        </div>
    )
}

export default BookStoreList;