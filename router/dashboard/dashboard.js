const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage')

//To get secret key
require('dotenv').config()
const jwt_key = process.env.secret_key;

//For event schema
const Event = require('../../model/event/event');

router.post('/event', (req, res)=>{
    const event = new Event({
        id: req.body.id,
        name: req.body.name,
        date: new Date(),
        description: req.body.description
    })
    event
    .save()
    .then(event=>{
        console.log("Inserted event is:", event);
        return res.status(200).json({
            message: event
        })
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            message: err
        })
    });
})


//To get event data
router.post('/cv', (req, res)=>{
    Event.find({id: req.body.id})
    .exec()
    .then(event =>{
        console.log("Details of an event is:", event);
        return res.status(200).json({
            message: event
        })
    })
    .catch(err =>{
        message: "No event occured"
    })
})


module.exports = router;
