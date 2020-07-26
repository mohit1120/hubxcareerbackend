const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage')


//To get secret key
require('dotenv').config()
const jwt_key = process.env.secret_key;

//To create user schema
const User = require('../../model/user/user');

//Signup
router.post('/signup', (req, res)=>{

    User.find({email: req.body.email})
    .exec()
    .then(user =>{
try {
    req.body = JSON.parse(req.body); 
} catch (e) {
   console.log(req.body);
}

        if(user && user.length > 0) {
            console.log("User alreday exist:", user);
            return res.status(200).json({
                message: "User already exist"
            })
        } else {

          
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err) {
                    return res.status(500).json({
                        error:"123"
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash 
                    })
                    user
                        .save()
                        .then(result =>{
                            console.log("User created successfully:", result),
 res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "X-Requested-With"),
                            res.status(200).json({
                                meassage: "User created successfully"
                            })
                        })
                        .catch(err =>{
                            console.log("error occured");
                            res.status(500).json({
                                error: "1234"
                            })
                        });
                }
            });
        }
    })
    .catch(err =>{
        console.log("Error occured");
        res.status(500).json({
            error: err
        })
    })
   
})

//Login
router.post('/login', (req, res)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            console.log("User doesn't exist");
            return res.status(401).json({
                message:"User doesn't exist",
success:false
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
                if(err){
                    console.log("User doesn't exist");
                    return res.status(401).json({
                        message:"User doesn't exist"
                    }) 
                }
                if(result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                     jwt_key,
                     {
                         expiresIn: "1h"
                     } 
                    );
                    console.log("Logged In user is:", token);
                    localStorage.setItem('token_id', token);
                    const token_id = localStorage.getItem('token_id');
                    console.log("Token id is:", token_id);
                    const decoder = jwt.verify(token, jwt_key);
                    console.log(decoder);
                    return res.status(200).json({
                        user_info: user,
                        token: token,
                        success:true

                    })
                }
        })
    })
    .catch(err =>{
        console.log(err);
        return res.status(500).json({
            message: err
        })
    })
})

//To remove user
router.post('/remove', (req, res)=>{
    User.deleteMany({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length > 0){
        console.log("User deleted successfully");
        }
        return res.json({
            message: "User doesn't exist"
        })
    })
    .catch(err =>{
        error: err
    })
})

router.get('/users', (req, res)=>{
    User.find({})
    .exec()
    .then(user =>{
        
        return res.json({
            message: "User exist",
           User:user

        })
    })
    .catch(err =>{
        error: err
    })
})


module.exports = router;
