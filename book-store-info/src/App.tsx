import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import BookStoreList, {BookStoreListProps} from './Components/BookStoreList'

interface bookStoreState {
  bookStoreList : BookStoreListProps
}

const defaultState  = {
  bookStoreList :{
    data : [],
    included : []
  }
}

function App() {

  const [info, setInfo] = useState(defaultState as bookStoreState)

  const loadInfo = () => {
    return fetch('http://localhost:3000/stores').then(data => {
      return data.json()
    }).then(jsonData => {
      // console.log(jsonData)
      setInfo({
        bookStoreList : {
          data : jsonData["data"],
          included : jsonData["included"]
        }
      })
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadInfo()

  }, [])

 


  return (
    <div className="App">
      <div>
        <BookStoreList
        data = {info.bookStoreList["data"]}
        included = {info.bookStoreList["included"]}
        ></BookStoreList>

      </div>
    </div>
  );
}

export default App;
