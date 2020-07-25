const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');

require('dotenv').config()
const port = process.env.port || 8080;

//To create server
const app = express();

//for db connection
const connectDB = require('./config');
connectDB();

//setting Middleware bodyparser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//setting static folders 
app.use(express.static(__dirname + '/public'));

//setting views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//for actual routes
const User = require('./router/user/user',);
app.use('/', User);
const Dashboard = require('./router/dashboard/dashboard');
app.use('/', Dashboard);

app.get('/', (req, res)=>{
    res.send("Hello profile");
});

app.listen(port, ()=>{
    console.log("Server is running at port no.", port);
})

