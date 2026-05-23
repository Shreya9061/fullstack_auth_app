const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || process.env.jwtSecret;

//GENEREATE TOKEN
exports.generateToken = (payload) => {
   
    return jwt.sign(
        
        payload, 
        jwtSecret, 
        
        { 
            expiresIn: '1d' 
        });
};

//VERIFY TOKEN
exports.verifyToken = (token) => {
    return jwt.verify(
        token,
         jwtSecret
    );
};    

