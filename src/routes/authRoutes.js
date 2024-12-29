const express = require("express");
const {loginUser, registerUser, currUser, googleLogin} = require("../controllers/authController");
const tokenAuthenticator=require('../middlewares/tokenAuthenticator')
const router = express.Router();

router.post("/registerUser",registerUser );

router.post("/login",loginUser );

router.get("/googleLogin",googleLogin );

router.post("/curr",tokenAuthenticator,currUser );


module.exports= router