const Template = require('../../models/template');

module.exports = {
    create,
};

async function create(req, res) {
    try{
        const template = await Template.create(req.body);

        return res.json(template);
    } catch (err) {
        return res.status(401).json(err);
    }
}