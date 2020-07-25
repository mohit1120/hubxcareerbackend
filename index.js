const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyparser = require('body-parser');

//require('dotenv').config()

const cors=require('cors');
//To create server
const app = express();
app.use(cors());
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
const User = require('./router/user/user');
app.use('/', User);
const Dashboard = require('./router/dashboard/dashboard');
app.use('/', Dashboard);

app.get('/', (req, res)=>{
    res.send("Hello profile");
});

app.listen(process.env.PORT || 3000);

