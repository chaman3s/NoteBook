const  jwt = require('jsonwebtoken');
require("dotenv").config();
const sign_secret = process.env.Secret_sign

const fetchuser = (req, res,next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({error: 'Invalid token'});
    }
    try {
        const data = jwt.verify(token,sign_secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Invalid token'});
    }
}
module.exports = fetchuser;