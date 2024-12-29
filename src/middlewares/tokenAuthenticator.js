const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY_FOR_TOKEN;

const tokenAuthenticator = (req, res, next) => {
    let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            req.user = decodedToken.user;
            next(); 
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                console.log("JWT Error:", error.message);
                return res.status(400).json({ status: 'FAILED', title: "TOKEN VERIFICATION FAILED", message: 'Invalid Token' });
            } else if (error.name === 'TokenExpiredError') {
                console.log("JWT Expired:", error.message);
                return res.status(401).json({ status: 'FAILED', title: "TOKEN VERIFICATION FAILED", message: 'Token Expired' });
            } else {
                console.log("Token Verification Error:", error.message);
                return res.status(403).json({ status: 'FAILED', title: "TOKEN VERIFICATION FAILED", message: 'Could not verify token' });
            }
        }
    } else {
        res.status(401).json({ status: 'FAILED', title: "TOKEN VERIFICATION FAILED", message: 'Token is not provided' });
    }
};

module.exports = tokenAuthenticator;
