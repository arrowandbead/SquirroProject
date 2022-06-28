import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector} from "react-redux";


interface BookStorePanelInterFace {
    index : number
}
const styles = createUseStyles({
    Outer : {
        minHeight : "20vh",
        minWidth : "600px",
        width : "70vw",
        backgroundColor : "grey",
        margin : "1vh",
        display : "flex",
        flexDirection : "row"
    },
    LeftSection : {
        display : "flex",
        maxWidth : "30%",
        minWidth : "100px",
        flex : 1,
        maxHeight : "100%",
        backgroundColor : "green",
        alignItems : "center",
        justifyContent : "center"

    },
    RightSection : {
        // display : "flex",
        // maxWidth :  "70%",
        // minWidth : "300px",
        // flex : 3,
        // maxHeight : "100%",
        // backgroundColor : "yellow"
        height : "100px",
        width : "100px"
    },
    PicHolder : {
        height : "80%",
        width : "80%",
        backgroundColor : "purple",
        objectFit : "contain"
    },
    Pic : {
        maxHeight : "100%",
        maxWidth : "100%"
    }
    
  });

function BookStorePanel({index} : BookStorePanelInterFace) {
    const classes = styles()
    const {info} = useSelector((state : any) => state.bookStoreInfo)
    // {data.attributes.name}
    console.log(info.stores[index])
    // {index.toString()}
    return (
    <div className={classes.Outer} >
        <div className={classes.LeftSection}>
            <div className={classes.PicHolder}>
                <img alt="book store " className={classes.Pic} src='https://i.pinimg.com/736x/51/a2/47/51a247e0d1785b89b70a17a1c8f31ac5--melbourne-australia-second-hand.jpg'>
                </img>
            </div>
        </div>
        <div className={classes.RightSection}></div>
    </div>
    )
    
}

export default BookStorePanel;