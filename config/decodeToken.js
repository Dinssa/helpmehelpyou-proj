const jwt = require('jsonwebtoken');

module.exports = function(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
};


