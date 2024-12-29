const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY_FOR_TOKEN;

 const generateToken=(data)=>{
    const accessToken = jwt.sign(
                data,
            SECRET_KEY,
            { expiresIn: "2m" }
          );

  return accessToken
}

module.exports= generateToken;