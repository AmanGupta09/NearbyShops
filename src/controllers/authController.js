const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const oauth2Client = require("../connfig/oauth2client");
const axios = require("axios");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY_FOR_TOKEN;

const registerUser = async (req, res) => {
  console.log("DATA IN REGISTER ROUTE: ", req.body);
  const { username, email, password, role } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const userExists = await User.find({ email });
  if (userExists.length > 0) {
    res
      .status(200)
      .json({ title: "ACKNOWLEDGE!", message: "USER ALREADY EXISTS!" });
  } else {
    try {
      const registerUser = await User.create({
        username,
        email,
        role: role,
        password: hashedPassword,
      });
      let user = {
        email: registerUser?.email,
        id: registerUser?.id,
      };
      const accessToken = generateToken(user);
      if (registerUser)
        responseData = {
          username: registerUser?.username,
          emaile: registerUser?.email,
          created_at: registerUser?.createdAt,
          accessToken,
        };
      res.status(201).json({
        status: "SUCCESS",
        title: "REGISTERED SUCCESSFULLY",
        data: { ...responseData },
      });
    } catch (err) {
      res.status(400).json({ error: err?.name, message: err.message });
    }
  }
};

const loginUser = async (req, res) => {
  // console.log('DATA IN LOGIN ROUTE: ',req.body)
  const { email, password } = req.body;
  const userExists = await User.find({ email });
  if (userExists.length !== 0) {
    const checkPassword = await bcrypt.compare(
      password,
      userExists[0]?.password
    );
    if (checkPassword) {
      //  console.log('USER IN LOGIN:',userExists)

      let user = {
        email: userExists[0]?.email, // Access the first element in the array
        id: userExists[0]?.id,
      };
      const accessToken = generateToken(user);
      res
        .status(200)
        .json({
          status: "SUCCESS",
          title: "LOGIN SUCCESSFULLY",
          data: { accessToken },
        });
    } else {
      res.status(401).json({
        status: "FAILED",
        title: "LOGIN FAILED",
        message: "YOU ARE ENTERING THE WRONG PASSWORD",
      });
    }
  } else {
    res.status(404).json({ status: "FAILED", title: "USER NOT FOUND" });
  }
};

const googleLogin = async (req, res) => {
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.oauth2Client.getToken(code);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    let user = await User.find({ email: userRes.data.email });
    if (user.length === 0) {
      try {
        const registerUser = await User.create({
          username: userRes.data.name,
          email: userRes.data.email,
          google_id: userRes.data.id,
        });
        let newUser = {
          email: registerUser?.email,
          id: registerUser?.id,
        };
        const accessToken = generateToken(newUser);
        if (registerUser)
          responseData = {
            username: registerUser?.username,
            email: registerUser?.email,
            created_at: registerUser?.createdAt,
            accessToken,
          };
        res.status(201).json({
          status: "SUCCESS",
          title: "REGISTERE WITH GOOGLE SUCCESSFULLY",
          data: { ...responseData },
        });
      } catch (err) {
        console.log("ERROR IN GOOGLE REGISTER: ", err);
        res.status(400).json({ error: err?.name, message: err.message });
      }
    }
    else{
      if(user[0].google_id===userRes.data.id){
        let existingUser = {
          email: user[0]?.email, 
          id: user[0]?.id,
        };
        const accessToken = generateToken(existingUser);
        res
          .status(200)
          .json({
            status: "SUCCESS",
            title: "LOGIN WITH GOOGLE SUCCESSFULLY",
            data: { accessToken },
          });
      }
    }
  } catch (err) {
    console.log("OATH RESULT ERROR: ", err);
    res
      .status(401)
      .json({
        status: "FAILURE",
        title: "UNAUTHORIZE",
        message: "CODE WAS NOT VALID",
      });
  }
};

const currUser = (req, res) => {
  // console.log('REQ IN CURRENT ROUTE:',req.headers?.authorization)
  res.status(200).json({ status: "SUCCESS", title: "YOU'RE ON CURRENT ROUTE" });
};

module.exports = { loginUser, registerUser, currUser, googleLogin };
