const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const projectController = require('../../controllers/api/project');


// Route for getting all projects
router.get('/projects', ensureLoggedIn, projectController.index);

// Route for getting all projects that belong to the user
router.get('/projects/user', ensureLoggedIn, projectController.userIndex);

// Route for getting all non-archived projects that belong to the user
router.get('/projects/user/nonarchived', ensureLoggedIn, projectController.userIndexNonArchived);

// Route for getting all archived projects that belong to the user
router.get('/projects/user/archived', ensureLoggedIn, projectController.userIndexArchived);

// Route for getting a project
router.get('/projects/:id', ensureLoggedIn, projectController.show);

// Route for creating a project
router.post('/projects', ensureLoggedIn, projectController.create);

// Route for updating a project
router.put('/projects/:id', ensureLoggedIn, projectController.update);

// Route for deleting a project
router.delete('/projects/:id', ensureLoggedIn, projectController.delete);

// Route for searching projects by name or description
router.get('/projects/search/:searchQuery', ensureLoggedIn, projectController.search);

// Route for adding a form to a project
router.post('/projects/:id/addform/:templateId', ensureLoggedIn, projectController.addForm);

// Route for deleting a form from a project
router.delete('/projects/:id/deleteform/:formId', ensureLoggedIn, projectController.deleteForm);

// Route for archiving a project
router.put('/projects/:id/archive', ensureLoggedIn, projectController.archive);

// Route for unarchiving a project
router.put('/projects/:id/unarchive', ensureLoggedIn, projectController.unarchive);

// Route for cloning a project
router.post('/projects/:id/clone', ensureLoggedIn, projectController.clone);

module.exports = router;