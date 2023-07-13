const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const formController = require('../../controllers/api/form');

// Route for getting all forms
router.get('/forms', ensureLoggedIn, formController.index);

// Route for getting all forms that belong to the user
router.get('/forms/user', ensureLoggedIn, formController.userIndex);

// Route for getting all non-archived forms that belong to the user
router.get('/forms/user/nonarchived', ensureLoggedIn, formController.userIndexNonArchived);

// Route for getting all archived forms that belong to the user
router.get('/forms/user/archived', ensureLoggedIn, formController.userIndexArchived);

// Route for getting a form
router.get('/forms/:id', ensureLoggedIn, formController.show);

// Route for creating a form
router.post('/forms', ensureLoggedIn, formController.create);

// Route for updating a form
router.put('/forms/:id', ensureLoggedIn, formController.update);

// Route for deleting a form
router.delete('/forms/:id', ensureLoggedIn, formController.delete);

module.exports = router;