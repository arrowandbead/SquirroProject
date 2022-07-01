# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Starting
Download the directory and run npm install in both the book-store-api folder and the book-store-info folder.

In the command line, go to the book-store-api folder and run npm start there. It will begin the backend on Port 3000.
In the command line, go to the book-store-info folder and run npm start there. Hit y if it asks you if you would like to keep laucnhing on a different port. This will happen if 3001 isn't open.
View the website on localhost:3001 (or whatever port it started the front end on after you hit y.)

## Notes
To manage state I used redux toolkit. In the slice file I make maps from the ids of the included objext to all the included objects. I also pre calculate the top two books for each store. Each BookStorePanel knows its index within the state and I avoid passing parameters through the app -> bookstorelist -> bookstorepanel this way.

Try resizing it works just about perfectly on everything except I would say the store image. I was spending too much time on that part and thought it best to submit. 

I used mui icons which I judged to not be under the mui restrictions laid out in the description (that seemed more about css).