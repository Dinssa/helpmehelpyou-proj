const Project = require('../../models/project');
const Form = require('../../models/form');
const Template = require('../../models/template');
const decodeToken = require('../../config/decodeToken');

module.exports = {
    create, //works
    index, //works
    userIndex,
    userIndexNonArchived,
    userIndexArchived,
    userDeleteAll,
    show,
    update,
    delete: deleteOne,
    search,
    addForm,
    deleteForm,
    archive,
    unarchive,
    clone,
    deleteAll
};

// Create a project
// POST /api/projects
async function create(req, res) {
    try{
        const decodedToken = decodeToken(req);
        req.body.user = decodedToken.user.id;
        const project = await Project.create(req.body);
        if (!project) throw new Error('Project not created');

        return res.json(project);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all projects
// GET /api/projects/all
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
// GET /api/projects/user
async function userIndex(req, res) {
    try{
        const decodedToken = decodeToken(req); 
        const projects = await Project.find({user: decodedToken.user.id});
        if (!projects) throw new Error('No projects found');
        return res.json(projects);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all non-archived projects that belong to the user
// GET /api/projects/user/nonarchived
async function userIndexNonArchived(req, res) {
    try{
        const decodedToken = decodeToken(req); 
        const projects = await Project.find({user: decodedToken.user.id, archived: false});
        if (!projects) throw new Error('No projects found');
        return res.json(projects);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Get all archived projects that belong to the user
// GET /api/projects/user/archived
async function userIndexArchived(req, res) {
    try{
        const decodedToken = decodeToken(req); 
        const projects = await Project.find({user: decodedToken.user.id, archived: true});
        if (!projects) throw new Error('No projects found');

        return res.json(projects);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete all projects that belong to the user
// DELETE /api/projects/user
async function userDeleteAll(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const result = await Project.deleteMany({ user: decodedToken.user.id });
        return res.json(result);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Show a project
// GET /api/projects/:id
async function show(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        return res.json(project);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Search for a project by name or description partial match
// GET /api/projects/search?searchQuery=abc
async function search(req, res) {
    try{
        const decodedToken = decodeToken(req);
        const projects = await Project.find({
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
        if (!projects) throw new Error('Project not found');

        projects.sort((a, b) => {
            if (a.archived && !b.archived) {
                return 1;
            } else if (!a.archived && b.archived) {
                return -1;
            } else {
                return 0;
            }
        });

        return res.json(projects);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Update a project
// PUT /api/projects/:id
async function update(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        Object.assign(project, req.body);
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Delete a project
// DELETE /api/projects/:id
async function deleteOne(req, res) {
    try{
        const result = await Project.deleteOne({_id: req.params.id});
        return res.json(result);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Add a form to a project, by creating a form (from an existing template) and adding the form's id to the project's forms array
// POST /api/projects/addform/:projectId/:templateId
async function addForm(req, res) {
    try{
        console.log(req.params);
        const project = await Project.findById(req.params.projectId);
        if (!project) throw new Error('Project not found');
        const template = await Template.findById(req.params.templateId);
        if (!template) throw new Error('Template not found');
        const form = await Form.create({
            name: template.name, 
            fields: template.fields
        });
        project.forms.push(form.id);
        await project.save();
        return res.json(form);
    } catch (err) {
        return res.status(404).json(err);
    }
}

// Delete a form from a project, by removing the form's id from the project's forms array and deleting the form
// DELETE /api/projects/deleteform/:projectId/:formId
async function deleteForm(req, res) {
    try{
        const project = await Project.findById(req.params.projectId);
        if (!project) throw new Error('Project not found');
        const form = await Form.findById(req.params.formId);
        console.log(form._id);
        if (!form) throw new Error('Form not found');
        console.log(project.forms);
        project.forms.remove(form._id);
        await project.save();
        const result = await Form.deleteOne({_id: form._id});
        return res.json(result);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Archive a project
// PUT /api/projects/archive/:id
async function archive(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        project.archived = true;
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Unarchive a project
// PUT /api/projects/unarchive/:id
async function unarchive(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        project.archived = false;
        await project.save();
        return res.json(project);
    } catch (err) {
        return res.status(401).json(err);
    }
}

// Clone a project, by creating a new project with the same name, description, and duplicate forms
// POST /api/projects/clone/:id
async function clone(req, res) {
    try{
        const project = await Project.findById(req.params.id);
        if (!project) throw new Error('Project not found');
        const fieldsToCopy = {
            ...project._doc,
        }

        delete fieldsToCopy._id;
        delete fieldsToCopy.__v;
        delete fieldsToCopy.id;
        delete fieldsToCopy.createdAt;
        delete fieldsToCopy.updatedAt;
        delete fieldsToCopy.archived;
        delete fieldsToCopy.forms;

        fieldsToCopy.name += ' copy';
        
        console.log(fieldsToCopy);
        const newProject = await Project.create(fieldsToCopy);
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
        return res.status(401).json(err);
    }
}

// Delete all projects
// DELETE /api/projects/all
async function deleteAll(req, res) {
    try{
        const result = await Project.deleteMany({});
        return res.json(result);
    } catch (err) {
        return res.status(401).json(err);
    }
}