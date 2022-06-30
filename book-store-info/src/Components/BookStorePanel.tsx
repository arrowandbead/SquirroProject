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
        backgroundColor : "lightgreen",
        margin : "1vh",
        display : "flex",
        border : "2px solid black",
        
        flexDirection : "column"
    },
    OuterPad : {
        height : "100%",
        width : "100%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center"
    },
    TopSection : {
        
        display : 'flex',
        flexDirection : "row",
        height : "70%",
        width : "90%"




    },
    BottomSection : {
        backgroundColor : "yellow",
        display : "flex",
        height : "20%",
        width : "90%"

    },
    PictureSection : {
        display : "flex",
        maxWidth : "30%",
        minWidth : "100px",
        flex : 1,
        height : "100%",
        backgroundColor : "#e0e0eb",
        alignItems : "center",
        justifyContent : "center"
    },
    InfoBodySection : {
        backgroundColor : "yellow",
        display : "flex",
        height : "100%",
        minWidth : "70%",
        flexDirection : "column"
        
    },
    PicHolder : {
        height : "80%",
        width : "80%",
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
        backgroundColor : "red",
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
        
    },
    BottomSectionLeft : {
        height : "100%",
        width : "50%",
        display : "flex",
        justifyContent : "left",
        alignItems : "center",
        backgroundColor : "lightblue",
        paddingLeft : "10px"
    },
    BottomSectionRight : {
        height : "100%",
        width : "50%",
        display : "flex",
        justifyContent : "right",
        alignItems : "center",
        backgroundColor : "lightblue",
        paddingRight : "10px"
        
    },
    BookInfoSection : {
        height : "100%",
        width : "100%",
        backgroundColor : "white",
        display : "flex",
        flexDirection : "column",
    },
    BookInfoHeaderSection : {
        width : "100%",
        display : "flex",
        flex : 1,
        border: 'solid rgba(0, 0, 0, 1)', 
        borderWidth : "2px 0 0 2px",
        // paddingLeft : "5px"


    },
    BookInfoBookRow : {
        width : "100%",
        display : "flex",
        flex : 1,
        borderWidth : "2px 0 0 0",
        border: 'solid rgba(0, 0, 0, 1)',

    },
    Cell : {
        alignItems : "center",
        justifyContent : "center",
        borderWidth : "0 0 0 2px",
        border: 'solid rgba(0, 0, 0, 1)', 


        display : "flex",
        flex : 1

    }



    
  });

function BookStorePanel({index} : BookStorePanelInterFace) {
    const classes = styles()
    const {info} = useSelector((state : any) => state.bookStoreInfo)
    console.log(info.stores[index])

    const date = new Date(info[index].establishmentDate)
    const formattedDate = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2,'0') + '/' + String(date.getFullYear())
    const dateWebsiteFeatureContent = info[index].website
    return (
    <div className={classes.Outer} >
        <div className={classes.OuterPad}>
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
                    <div className={classes.BookInfoSection}>
                        <div className={classes.BookInfoHeaderSection}>
                            <h2>Best-Selling Books</h2>
                        </div>
                        <div className={classes.BookInfoBookRow}>
                            <div className={classes.Cell}>

                            </div>
                            <div className={classes.Cell}></div>
                        </div>
                        <div className={classes.BookInfoBookRow}>
                            <div className={classes.Cell}></div>
                            <div className={classes.Cell}></div>
                        </div>

                    </div>

                </div>
            </div>
            <div className={classes.BottomSection}>
                <div className={classes.BottomSectionLeft}>hi</div>
                <div className={classes.BottomSectionRight}>there</div>

            </div>
        </div>
    </div>
    )
    
}

export default BookStorePanel;