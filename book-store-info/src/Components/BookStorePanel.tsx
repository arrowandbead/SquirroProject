import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector} from "react-redux";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { BookItem } from '../State/bookStoreInfoSlice';
import { cardContentClasses } from '@mui/material';

interface BookStorePanelInterFace {
    index : number
}
const styles = createUseStyles({
    Outer : {
        height : "30vh",
        minWidth : "600px",
        width : "70vw",
        backgroundColor : "lightgreen",
        margin : "1vh",
        display : "flex",
        
        
        flexDirection : "column"
    },
    OuterPad : {
        height : "100%",
        width : "100%",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
    },
    TopSection : {
        
        display : 'flex',
        flexDirection : "row",
        height : "70%",
        width : "90%",
        border: 'solid rgba(0, 0, 0, 1)', 
        borderWidth : "2px 2px 0 2px",
        backgrounColor : "red"
    },
    BottomSection : {
        backgroundColor : "lightblue",
        display : "flex",
        height : "20%",
        width : "90%",
        border: 'solid rgba(0, 0, 0, 1)', 
        borderWidth : "0 2px 2px 2px",
        textAlign : "left",

    },
    PictureSection : {
        display : "flex",
        maxWidth : "30%",
        flex : 1,
        height : "100%",
        backgroundColor : "#e0e0eb",
        alignItems : "center",
        justifyContent : "center",
    },
    InfoBodySection : {
        backgroundColor : "yellow",
        display : "flex",
        height : "100%",
        minWidth : "70%",
        flexDirection : "column",
        // border: 'solid rgba(0, 0, 0, 1)', 
        // borderWidth : "0 2px 0 0",
        
    },
    PicHolder : {
        height : "80%",
        width : "80%",
        objectFit : "contain",
        display : "flex",
        alignItems : "center",
        justifyContent : "center"
        
    },
    FlagPicHolder : {
        height : "4vh",
        width : "auto",
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
        backgroundColor : "grey",
        border: 'solid rgba(0, 0, 0, 1)', 
        borderWidth : "0 2px 0 2px",
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
        alignItems : "center"
    },
    BottomSectionLeftLinkHolder : {
        height : "50%",
        width : "100%",
        display : "inline-block",
        
        // alignItems : "center",
        // justifyContent : "start",
        overflow : "hidden",
        whiteSpace : "nowrap",
        textOverflow : "ellipsis",
        verticalAlign : "middle",
        paddingLeft : "5px"
    },
    
    BottomSectionRight : {
        height : "100%",
        width : "50%",
        display : "flex",
        justifyContent : "right",
        alignItems : "center",
        paddingRight : "10px"
        
    },
    BookInfoSection : {
        height : "100%",
        width : "100%",
        backgroundColor : "white",
        display : "flex",
        flexDirection : "column",
        // borderWidth : "0 0 0 2px",
        // border: 'solid rgba(0, 0, 0, 1)',
    },
    BookInfoHeaderSection : {
        // width : "100%",
        display : "flex",
        alignItems : "center",
        maxHeight : "40%",
        flex : 1,
        border: 'solid rgba(0, 0, 0, 1)', 
        borderWidth : "2px 0 2px 2px",
        fontSize : "1.2em"
        // paddingLeft : "5px"


    },
    BookInfoBookRow : {
        display : "flex",
        maxHeight : "30%",
        flex : 1,
        
        borderWidth : "0px 0 2px 0",
        border: 'solid rgba(0, 0, 0, 1)',

    },
    CellTextWrapper : {
        height : "100%",
        width : "100%",
        overflow : "hidden",

        textOverflow : "ellipsis",
    },
    Cell : {
        
        flex : 1,
        display : 'flex',
        justifyContent : "left",
        alignItems : "center",
        borderWidth : "0 0 0 2px",
        border: 'solid rgba(0, 0, 0, 1)', 


    }



    
  });

function BookStorePanel({index} : BookStorePanelInterFace) {
    const classes = styles()
    const {info} = useSelector((state : any) => state.bookStoreInfo)
    const store = info.stores[index]

    const bookObjectsToDisplay : object[] = []

    if (store.relationships.books) {
        store.relationships.books.data.forEach( (rel : any) => {
            bookObjectsToDisplay.push(rel)
        })
    }
    
    const countryID = store.relationships.countries.data.id
    const countryCode = info.countries.get(String(countryID)).attributes.code
    const flagImageURL = "https://countryflagsapi.com/png/" + countryCode

    const storeID = store.id
    const topTwoBooks = info.topBooks.get(storeID)
   
    const date = new Date(store.attributes.establishmentDate)
    const formattedDate = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2,'0') + '/' + String(date.getFullYear())
    const dateWebsiteFeatureContent = formattedDate +  " - " + store.attributes.website

    const starChange = (newNumStars : number ) => {
        const url = process.env.REACT_APP_REQUEST_BASE_URL! + process.env.REACT_APP_PORT! + '/stores/data'
        // /data/' + (index + 1) + '/attributes'
        const reqBody = {
            "data": {
                "type" : "store",
                "id" : storeID,
                "attributes" : {
                    "rating": newNumStars
                }
                
            }
        }
        fetch(url, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json",
                "X-HTTP-Method-Override" : "PATCH",
            },
            body : JSON.stringify(reqBody)
        })
        .then( (r) => r.json() )
        .then( (j) => console.log(j))

    }
    return (
    <div className={classes.Outer} >
        <div className={classes.OuterPad}>
            <div className={classes.TopSection}>
                <div className={classes.PictureSection}>
                    <div className={classes.PicHolder}>
                        <img alt="book store " className={classes.Pic} src={store.attributes.storeImage}>
                        </img>
                    </div>
                </div>
                <div className={classes.InfoBodySection}>
                    <div className={classes.InfoBodyTopSection}>
                        <div className={classes.InfoBodyTopLeftSection}>{store.attributes.name}</div>
                        <div className={classes.InfoBodyTopRightSection}>
                            {[1,2,3,4,5].map( (num) => 
                                store.attributes.rating >= num ? 
                                <StarIcon 
                                key = {num}
                                onClick={() => console.log(num, index )}/>
                                :
                                <StarBorderIcon 
                                    key={num}
                                    onClick={() => starChange(num) }
                                />
                                )
                                

                            }
                        </div>
                    </div>
                    <div className={classes.BookInfoSection}>
                        <div className={classes.BookInfoHeaderSection}>
                            Best-Selling Books
                        </div>
                        {
                            (topTwoBooks.length) ? 
                                topTwoBooks.map( (book : BookItem, index : number) => {
                                    return(
                                        <div className={classes.BookInfoBookRow} key={index}>
                                            <div className={classes.Cell}>
                                                <div className={classes.CellTextWrapper}>{book.name}</div>
                                            </div>
                                            <div className={classes.Cell}>
                                                <div className={classes.CellTextWrapper}>{book.authorName}</div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className={classes.BookInfoBookRow}>
                                        <div className={classes.Cell}>
                                            <div className={classes.CellTextWrapper}>No data available</div>
                                        </div>
                                        <div className={classes.Cell}></div>
                                </div>
                        }
                    </div>

                </div>
            </div>
            <div className={classes.BottomSection}>
                <div className={classes.BottomSectionLeft}>
                    <div className={classes.BottomSectionLeftLinkHolder}>
                        {dateWebsiteFeatureContent}
                    </div>
                </div>
                <div className={classes.BottomSectionRight}>
                    <div className={classes.FlagPicHolder}>
                        <img  alt={"Flag of " + countryCode} src={flagImageURL} className={classes.Pic} />

                    </div>
                </div>

            </div>
        </div>
    </div>
    )
    
}

export default BookStorePanel;