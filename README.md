# Twitter-Clone

## .env file
 
 1. Create a .env file and add Environment Variable in `api` folder
 
 ```env
  PORT=YOUR_PORT (Default port is 8000)
  DATABASE=YOUR_DB_URL (you can use this if you want to run it in locally: mongodb://localhost/twitter_clone)
  SALT=10
  JWT_SECRET=RANDOM_STRING
 ```
 2. Create a .env file and add Environment Variable in `ui` folder
 
 ```env
 REACT_APP_API_URL=http://localhost:8000/api
 ```
 
 ## How to Run?

* Open both folder and run: `npm install`
* After installation, run booth application at the same time with: `npm start`

## Check Application

* Then: http://localhost:3000/
