const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');




//login signin
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = { email: email}

    //check user exist
    User.findOne(query, (err, user) =>{
        if(err) {
            return res.send({
                success : false,
                message: "Error, please try agin"
            });
        }
        if(!user) {
            return res.send({
                success : false,
                message: "Error, Account not found . . . ."
            });
        }

       user.isPasswordMatch(password, user.password,(err, isMatch) =>{
        if(!isMatch) {
            return res.send({
                success : false,
                message: "invalid password . . . "
            });
        }


        //user is valid

        // generate token
        const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: 60800});


        let returnuser = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id,
        
        }

        return res.send({
            success : true,
            message: "You can login now . . . ",
            user: returnuser,
            token
        });
    });

    });
});




//registeration signup
router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
        
    });

    newUser.save((err, user) => {
        if(err){
            return res.send({
               success: false,
               message: "Failed to save new user "
             });
        }
        res.send({
            success: true,
            message: " User saved . . .  ",
            user
        });

    });

    console.log(newUser);
});



module.exports = router;