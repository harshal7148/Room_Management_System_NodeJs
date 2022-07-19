//verify Token

//
const jwt = require('jsonwebtoken');
jwtKey = "jwt";
//

module.exports = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (bearerToken) {
        // const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if (err) res.json({ result: err })
            else next();
        })
    } else {
        res.send({ "Result": "Token not provided!" });
    }
}