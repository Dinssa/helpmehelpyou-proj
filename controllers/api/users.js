
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

async function create(req, res) {
    try{
        // Attempt to create the user from request body
        const user = await User.create(req.body);

        // Generate a jwt that contains the user information and is signed with the secret
        const token = createJWT(user);

        return res.json(token);
    } catch (err) {
        return res.status(401).json(err);
    }

    res.json({
        user: {
        name: req.body.name,
        email: req.body.email
        }
    });
}


function createJWT(user) {
    return jwt.sign(
        { user }, // data payload
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = {
    create
};