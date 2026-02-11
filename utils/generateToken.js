const jwt = require("jsonwebtoken");

const generateToken = (user) => {
        return jwt.sign({emai,id:user_id},process.env.JWT_KEY);
}

module.exports.generateToken = generateToken;