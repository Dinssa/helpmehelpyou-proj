const Form = require('../../models/form');

module.exports = {
    create,
};

async function create(req, res) {
    try{
        const form = await Form.create(req.body);

        return res.json(form);
    } catch (err) {
        return res.status(401).json(err);
    }
}