const Form = require('../../models/form');

module.exports = {
    create,
    index,
    show,
    update,
    userIndex,
    userIndexNonArchived,
    userIndexArchived,
    delete: deleteOne,
};

// Create a form
async function create(req, res) {
    try{
        const form = await Form.create(req.body);

        return res.json(form);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all forms
async function index(req, res) {
    try{
        const forms = await Form.find({});

        return res.json(forms);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all forms that the user has access to
async function userIndex(req, res) {
    try{
        const forms = await Form.find({sharedWith: req.user._id});

        return res.json(forms);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }        
}

// Get all forms that the user has access to, not archived
async function userIndexNonArchived(req, res) {
    try{
        const forms = await Form.find({sharedWith: req.user._id, archived: false});

        return res.json(forms);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all forms that the user has access to, archived
async function userIndexArchived(req, res) {
    try{
        const forms = await Form.find({sharedWith: req.user._id, archived: true});

        return res.json(forms);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Show a form
async function show(req, res) {
    try{
        const form = await Form.findById(req.params.id);

        return res.json(form);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Update a form
async function update(req, res) {
    try{
        const form = await Form.findById(req.params.id);
        if (!form) throw new Error('Form not found');
        Object.assign(form, req.body);
        await form.save();
        return res.json(form);        
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Delete a form
async function deleteOne(req, res) {
    try{
        const form = await Form.findById(req.params.id);
        if (!form) throw new Error('Form not found');
        await form.remove();
        return res.json(form);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}