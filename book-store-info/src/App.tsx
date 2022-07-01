import React, {useEffect} from 'react';
import './App.css';
import { useDispatch} from "react-redux";
import {getBookStoreInfo} from "./State/bookStoreInfoSlice"
import {AppDispatch} from "./State/store"


import BookStoreList from './Components/BookStoreList'
import { createUseStyles } from 'react-jss';

function App() {

  const styles = createUseStyles({ 
    outerDiv : {
      display : "flex",
      justifyContent : "center",
      alignItems :"center"
    }
  })


  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getBookStoreInfo())

  },[dispatch])

  const classes = styles()
 


  return (
    <div className="App">
      <div className={classes.outerDiv}>
        <BookStoreList></BookStoreList> 
      </div>
    </div>
  );
}

export default App;
