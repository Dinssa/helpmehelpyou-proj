const Project = require('../../models/project');
const Form = require('../../models/form');
const Template = require('../../models/template');

module.exports = {
    create,
    index,
    userIndex,
    userIndexNonArchived,
    userIndexArchived,
    show,
    update,
    delete: deleteOne,
    search,
    addForm,
    deleteForm,
    archive,
    unarchive,
    clone
};

async function create(req, res) {
    try{
        const project = await Project.create(req.body);
        if (!project) throw new Error('Project not created');

        return res.json(project);
    } catch (err) {

        return res.status(401).json(err);
    }
}

// Get all projects
async function index(req, res) {
    try{
        const projects = await Project.find({});
        if (!projects) throw new Error('No projects found');

        return res.json(projects);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Get all projects that belong to the user
async function userIndex(req, res) {
    try{
        const projects = await Project.find({user: req.user._id});
        if (!projects) throw new Error('No projects found');

        return res.json(projects);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Get all non-archived projects that belong to the user
async function userIndexNonArchived(req, res) {
    try{
        const projects = await Project.find({user: req.user._id, archived: false});
        if (!projects) throw new Error('No projects found');

        return res.json(projects);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Get all archived projects that belong to the user
async function userIndexArchived(req, res) {
    try{
        const projects = await Project.find({user: req.user._id, archived: true});
        if (!projects) throw new Error('No projects found');

        return res.json(projects);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Show a project
async function show(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Search for a project by name or description partial match
async function search(req, res) {
    try{
        const projects = await Project.find({
            $or: [{name: {$regex: req.params.query, $options: 'i'}}, 
            {description: {$regex: req.params.query, $options: 'i'}}]
        });
        if (!projects) throw new Error('Project not found');

        return res.json(projects);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Update a project
async function update(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        Object.assign(project, req.body);
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Delete a project
async function deleteOne(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        await project.remove();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Add a form to a project, by creating a form (from an existing template) and adding the form's id to the project's forms array
async function addForm(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        const template = await Template.findById(req.params.templateId);
        if (!template) throw new Error('Template not found');
        const form = await Form.create({
            name: template.name, 
            fields: template.fields
        });
        project.forms.push(form._id);
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Delete a form from a project, by removing the form's id from the project's forms array and deleting the form
async function deleteForm(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        const form = await Form.findById(req.params.formId);
        if (!form) throw new Error('Form not found');
        project.forms.remove(form._id);
        await project.save();
        await form.remove();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Archive a project
async function archive(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        project.archived = true;
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Unarchive a project
async function unarchive(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        project.archived = false;
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}

// Clone a project, by creating a new project with the same name, description, forms
async function clone(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        const newProject = await Project.create({
            name: project.name,
            description: project.description,
            user: req.user._id
        });
        for (let i = 0; i < project.forms.length; i++) {
            const form = await Form.findById(project.forms[i]);
            const newForm = await Form.create({
                name: form.name,
                fields: form.fields
            });
            newProject.forms.push(newForm._id);
            await newProject.save();
        }
        return res.json(newProject);
    } catch (err) {
        return res.status(err.code || 401).json(err);
    }
}