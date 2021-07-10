//external package
const express =  require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const  cors = require('cors');


require('dotenv').config();

//app
const app = express();

// import all router
const authRouter =  require('./routes/auth.js');


//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser());
app.use(cors());


//connect to db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then( () =>{ 
    console.log("Connected To Database");
} )


//routing file
app.use("/api",authRouter);




//run the server
const port = process.env.PORT || 8000 ;
app.listen(port, ()=>{
    console.log("Server is Running on Port: "+port);
})