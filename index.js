require("dotenv").config();
const express = require('express');
const db = require('./config/mongoose');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const app = express();



//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(session({
    name: "Social media",
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000*60*100,
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/SocialAPI",
        autoRemove: 'disabled',
    }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//routes
app.use('/', require('./routes/index'));

//listening app
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is running on port", PORT);
    }
});