import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector} from "react-redux";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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
    TopSection : {
        height : "90%",
        width : "100%",
        display : 'flex',
        flexDirection : "row",
        backgroundColor : "black"


    },
    PictureSection : {
        display : "flex",
        maxWidth : "30%",
        minWidth : "100px",
        flex : 1,
        height : "100%",
        backgroundColor : "green",
        alignItems : "center",
        justifyContent : "center"
    },
    InfoBodySection : {
        // display : "flex",
        // maxWidth :  "70%",
        // minWidth : "300px",
        // flex : 3,
        // maxHeight : "100%",
        backgroundColor : "yellow",
        display : "flex",
        height : "100%",
        minWidth : "70%"
        
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
    },
    InfoBodyTopSection : {
        height : "15%",
        width : "100%",
        display : "flex",
        flexDirection : "row",
        backgroundColor : "red"
    },
    InfoBodyTopLeftSection : {
        height : "100%",
        width : "50%",
        display : "flex",
        justifyContent : "left",
        alignItems : "center",
        backgroundColor : "grey"
    },
    InfoBodyTopRightSection : {
        height : "100%",
        width : "50%",
        display : "flex",
        justifyContent : "right",
        alignItems : "center",
        backgroundColor : "white"
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
        <div className={classes.TopSection}>
            <div className={classes.PictureSection}>
                <div className={classes.PicHolder}>
                    <img alt="book store " className={classes.Pic} src='https://i.pinimg.com/736x/51/a2/47/51a247e0d1785b89b70a17a1c8f31ac5--melbourne-australia-second-hand.jpg'>
                    </img>
                </div>
            </div>
            <div className={classes.InfoBodySection}>
                <div className={classes.InfoBodyTopSection}>
                    <div className={classes.InfoBodyTopLeftSection}>{info.stores[index].attributes.name}</div>
                    <div className={classes.InfoBodyTopRightSection}>
                        {[1,2,3,4,5].map( (num) => 
                            false ? 
                            <StarIcon 
                            onClick={() => console.log(num, index )}/>
                            :
                            <StarBorderIcon></StarBorderIcon>
                            )
                            

                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
    
}

export default BookStorePanel;