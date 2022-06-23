import React from 'react';
import { createUseStyles } from 'react-jss';


const styles = createUseStyles({
    Outer : {
        height : "15vh",
        width : "70vw",
        backgroundColor : "blue",
        margin : "1vh"
    }
  });

function BookStorePanel() {
    const classes = styles()
    return (<div className={classes.Outer} >hi</div>)
    
}

export default BookStorePanel;