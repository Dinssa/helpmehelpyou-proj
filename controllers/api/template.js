const Template = require('../../models/template');

module.exports = {
    create,
    index,
    userIndex,
    defaultIndex,
    show,
    update,
    delete: deleteOne,
    search,
};

// Create a template
async function create(req, res) {
    try{
        const template = await Template.create(req.body);

        return res.json(template);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all templates
async function index(req, res) {
    try{
        const templates = await Template.find({});

        return res.json(templates);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all templates that belong to the user
async function userIndex(req, res) {
    try{
        const templates = await Template.find({user: req.user._id});

        return res.json(templates);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all default templates
async function defaultIndex(req, res) {
    try{
        const templates = await Template.find({type: 'default'});
        return res.json(templates);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Show a template
async function show(req, res) {
    try{
        const template = await Template.findById(req.params.id);

        return res.json(template);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Find templates by name or description
async function search(req, res) {
    try{
        const templates = await Template.find({
            $or: [
                {name: {$regex: req.params.searchQuery, $options: 'i'}},
                {desc: {$regex: req.params.searchQuery, $options: 'i'}}
            ]
        });
        return res.json(templates);
    } catch (err) {
        return res.status(err.code || 401).json(err);
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
        return res.status(err.code || 401).json(err);
    }
}

// Delete a template
async function deleteOne(req, res) {
    try{
        const template = await Template.findById(req.params.id);
        if (!template) throw new Error('Template not found');
        await template.remove();
        return res.json(template);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}