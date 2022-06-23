import React, {useEffect} from 'react';
import { createUseStyles } from 'react-jss';
import BookStorePanel from './BookStorePanel';


export interface BookStoreListProps {
    data : object[],
    included : object[]
}
const styles = createUseStyles({
    Outer : {
        height : "100vh",
        width : "80vw",
        backgroundColor : "red",
        display : "flex",
        flexDirection : "column",
        alignItems : "center"
    }
  });


const BookStoreList = ({data, included} : BookStoreListProps) => {
    const classes = styles()
    useEffect(() => {

    }, [])
    return (
        <div className={classes.Outer}>
            {data.map((thing : object, index : number ) => {
                return (<BookStorePanel key={index}></BookStorePanel>)
            })}
        </div>
    )
}

export default BookStoreList;