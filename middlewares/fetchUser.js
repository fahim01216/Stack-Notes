const jwt = require('jsonwebtoken');
const JWT_SECRET = 'HFHSDFHUWYNBVNJIOA';

const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add the id to the req object
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: 'Unauthorized error!!'});
    }
    
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload.user;
        next();
    } catch (err) {
        res.status(401).send({error: err.message});
    }
}

module.exports = fetchUser;