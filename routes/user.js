const express = require("express");
const userRouter = express.Router();
const User = require("../model/User");
const {body, validationResult} = require("express-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

userRouter.post("/createuser", body("email","Incorrect Email").isEmail(),body("password","Length should be 5").isLength({min: 5}), async(req,res)=>{
    const {name, email, password, location} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const salt = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(req.body.password,salt);
    const userData = new User({
        name, email,password:hashPass,location
    })

    await userData.save().then((result)=>{
        res.status(200).json({
            success: true,
            message: "Data saved successfully",
            data : result
        })
    }).catch((err)=>{
        res.status(400).json({
            success: false,
            message: "Email already Exist..!!",
            error : err
        })
    })
})

userRouter.post("/login", async(req, res) => {
    const loginCred = req.body;

    await User.findOne({email:loginCred.email}).then((user)=>{
      if(user){
        bcrypt.compare(loginCred.password,user.password).then((response)=>{
          if(response){
            const jwtToken = jwt.sign({
              id: user._id
            },process.env.SECRETKEY)

            res.status(200).json({
              success : true,
              authToken : jwtToken
            })
          }else{
            res.status(400).json({
              success: false,
              message: "Email or Password does not match..!!"
            })
          }
        }).catch((err)=>{
          res.status(400).json({
            success : false,
            message : "Internal server error",
            err: err
          })
        })
      }else{
        res.status(500).json({
          success : false,
          message : "Email is not registered with us..."
        })
      }
    })

  });
  

module.exports = userRouter;