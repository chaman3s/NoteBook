const express = require('express');
const router = express.Router()
const User  = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const  fetchuser = require('../middleware/fetchuser');
require("dotenv").config({ path: '/var/www/html/INotebook/backend/.env'});
const sign_secret = process.env.Secret_sign

// route 1: create user 

router.post('/create', [

    body('name','Enter validate name').isLength({ min: 3 }),  
    body('email','Enter validate email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 })
    ],
     async  (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      let success = false;
      const errors = validationResult(req);
     
      if (!errors.isEmpty()) {
        console.log(errors.array()[0]);
        return res.status(400).json({ errors: errors.array()[0].msg });
      }
      try{
      let user = await User.findOne({email: req.body.email})
      if (user){ return res.status(400).json({ errors:"Sorry a user with this email already exists",success:success})
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
       user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,})

       const data ={
         user:{
           id: user.id
         }
       }
       const authtoken = jwt.sign(data,sign_secret) 
       res.status(200).json({authtoken,success:true})
      } catch (error) {
       console.error(error.message)
       res.status(500).json("some error  occurred",success)
    }
    
}) 

//route 2: login User
router.post('/login', [  
  body('email','Enter validate email').isEmail(),
  body('password','Password cannot be blank').exists(),
  ], async(req, res)=>{
    let success=false
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success: success });
      }
      const {email, password} = req.body;
      try {
        
       const  user = await User.findOne({email})
        if (!user){ return res.status(400).json({ errors:"check your email and pasword",success:success})
        }
        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
          return res.status(400).json({ errors:"check your email and pasword",success:success})}
          const data ={
            user:{
              id: user.id
            }
          }
          const authtoken = jwt.sign(data,sign_secret) 
          res.json({authtoken,success:true})
        
      } catch (error) {
        console.error(error.message)
        res.status(500).json({error:"some error  occurred"})
      }
  });
// routes 3 get lognin user details 
router.post('/getUser',fetchuser, async (req, res)=>{
    try {
      userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error")
  
}

});

module.exports = router;