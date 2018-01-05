var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    //Veryfi the token and return the decode values of the token
    try {
        
    var token = req.headers.authorization.split(' ')[1];
        
        var decoded = jwt.verify(token, 'some_secret');
        console.log(decoded);
        req.userData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    } 

}