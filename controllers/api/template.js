const Template = require('../../models/template');
const decodeToken = require('../../config/decodeToken');

module.exports = {
    create,
    index,
    userIndex,
    defaultIndex,
    show,
    update,
    delete: deleteOne,
    search,
    deleteAll,
    userDeleteAll
};

// Create a template
// POST /api/templates
async function create(req, res) {
    try{
        const decodedToken = decodeToken(req);
        req.body.user = decodedToken.user.id;
        const template = await Template.create(req.body);
        return res.json(template);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all templates
// GET /api/templates/all
async function index(req, res) {
    try{
        const templates = await Template.find({});
        if (!templates) throw new Error('No templates found');
        return res.json(templates);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all templates that belong to the user
// GET /api/templates/user
async function userIndex(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const templates = await Template.find({user: decodedToken.user.id});
        if (!templates) throw new Error('No templates found');

        return res.json(templates);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete all templates that belong to the user
// DELETE /api/templates/user
async function userDeleteAll(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const result = await Template.deleteMany({user: decodedToken.user.id});
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all default templates
// GET /api/templates/default
async function defaultIndex(req, res) {
    try{
        const templates = await Template.find({type: 'default'});
        if (!templates) throw new Error('No default templates found');
        return res.json(templates);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Show a template
// GET /api/templates/show/:id
async function show(req, res) {
    try{
        const template = await Template.findById(req.params.id);
        if (!template) throw new Error('Template not found');

        return res.json(template);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Find templates by name or description
// GET /api/templates/search?searchQuery=abc
async function search(req, res) {
    try{
        const decodedToken = decodeToken(req);
        // Templates that belong to the user and match the search query
        const templates = await Template.find({
            $and: [
                {
                $or: [
                    { name: { $regex: req.query.searchQuery, $options: 'i' } },
                    { desc: { $regex: req.query.searchQuery, $options: 'i' } }
                ]
                },
                { user: decodedToken.user.id }
            ]
        });
        if (!templates) throw new Error('Template not found');
        return res.json(templates);
    } catch (err) {
        return res.status(404).json(err);
    }
} 

// Update a template
async function update(req, res) {
    try{
        const template = await Template.findById(req.params.id);
        if (!template) throw new Error('Template not found');
        Object.assign(template, req.body);
        await template.save();
        return res.json(template);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete a template
// DELETE /api/templates/:id
async function deleteOne(req, res) {
    try{
        const result = await Template.deleteOne({_id: req.params.id});
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete all templates
// DELETE /api/templates/all
async function deleteAll(req, res) {
    try{
        const result = await Template.deleteMany({});
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}