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

router.post('/addevent', (req, res)=>{


    Event.find({id: req.body.id})
    .exec()
    .then(event =>{
try {
    req.body = JSON.parse(req.body); 
} catch (e) {
   console.log(req.body);
}

        if(event && event.length > 0) {
            console.log("Event alreday exist:", user);
            return res.status(200).json({
                message: "Event already exist",
                success: false
            })

        } else{

    const event = new Event({
        id: req.body.id,
        name: req.body.name,
        date: new Date(),
        description: req.body.description,
        created_by: req.body.email
    })



    
    event.save()
    .then(event=>{
        console.log("Inserted event is:", event);
        return res.status(200).json({
            message: "",
            success: true
        })
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    });


}
})
.catch(err =>{
    console.log("Error occured");
    res.status(500).json({
        error: err,
        message: "Something went wrong"
    })
})

})


//To get all events data
router.get('/eventlist', (req, res)=>{
    Event.find({})
    .exec()
    .then(events =>{
        console.log("Details of an event is:", events);
        return res.status(200).json({
             events:events,
             success:true
        })
    })
    .catch(err =>{
        message: "No event occured"
    })
})

//To get event data created by user
router.get('/event', (req, res)=>{
    console.log(req.params.email);
    Event.find({created_by: req.query.email})
    .exec()
    .then(events =>{
        console.log("Details of an event is:", events);
        return res.status(200).json({
             events:events,
             success:true
        })
    })
    .catch(err =>{
        message: "No event occured"
    })
})



module.exports = router;
