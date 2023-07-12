const Project = require('../../models/project');

module.exports = {
    create,
};

async function create(req, res) {
    try{
        const project = await Project.create(req.body);

        return res.json(project);
    } catch (err) {
        return res.status(401).json(err);
    }
}