const Form = require('../../models/form');
const decodeToken = require('../../config/decodeToken');

module.exports = {
    create,
    index,
    show,
    update,
    userIndex,
    userIndexNonArchived,
    userIndexArchived,
    delete: deleteOne,
    deleteAll
};

// Create a form
// POST /api/forms
async function create(req, res) {
    try{
        const decodedToken = decodeToken(req);
        req.body.user = decodedToken.user.id;
        const form = await Form.create(req.body);
        if (!form) throw new Error('Form not created');

        return res.json(form);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Get all forms
// GET /api/forms/all
async function index(req, res) {
    try{
        const forms = await Form.find({});
        if (!forms) throw new Error('No forms found');
        return res.json(forms);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all forms that the user has access to
// GET /api/forms/user
async function userIndex(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const forms = await Form.find({sharedWith: decodedToken.user.id});
        if (!forms) throw new Error('No forms found');
        return res.json(forms);
    } catch (err) {
        return res.status(404).json(err);
    }        
}

// Get all forms that the user has access to, not archived
// GET /api/forms/user/nonarchived
async function userIndexNonArchived(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const forms = await Form.find({sharedWith: decodedToken.user.id})
        .then((forms) => forms.filter((form) => !form.archived));
        if (!forms) throw new Error('No forms found');
        return res.json(forms);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all forms that the user has access to, archived
// GET /api/forms/user/archived
async function userIndexArchived(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const forms = await Form.find({sharedWith: decodedToken.user.id})
        .then((forms) => forms.filter((form) => form.archived));
        if (!forms) throw new Error('No forms found');

        return res.json(forms);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Show a form
// GET /api/forms/:id
async function show(req, res) {
    try{
        const form = await Form.findById(req.params.id);
        if (!form) throw new Error('Form not found');
        return res.json(form);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Update a form
// PUT /api/forms/:id
async function update(req, res) {
    try{
        const form = await Form.findById(req.params.id);
        if (!form) throw new Error('Form not found');
        Object.assign(form, req.body);
        await form.save();
        return res.json(form);        
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete a form
// DELETE /api/forms/:id
async function deleteOne(req, res) {
    try{
        const result = await Form.deleteOne({_id: req.params.id});
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete all forms
// DELETE /api/forms/all
async function deleteAll(req, res) {
    try{
        const result = await Form.deleteMany({});
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}