const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');
const templateController = require('../../controllers/api/template');

/**
 * @swagger
 * /api/templates:
 *   post:
 *     summary: Create a new template
 *     description: Create a new template with the specified name, description, and fields
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       '201':
 *         description: Created a new template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '400':
 *         description: Invalid request body
 *       '401':
 *         description: Unauthorized
 */
router.post('/templates', ensureLoggedIn, templateController.create);

// Route for getting all templates
router.get('/templates', templateController.index);

// Route for getting all templates that belong to the user
router.get('/templates/user', ensureLoggedIn, templateController.userIndex);

// Route for getting all default templates
router.get('/templates/default', templateController.defaultIndex);

// Route for getting a template
router.get('/templates/:id', templateController.show);

// Route for updating a template
router.put('/templates/:id', ensureLoggedIn, templateController.update);

// Route for deleting a template
router.delete('/templates/:id', ensureLoggedIn, templateController.delete);

// Route for searching templates by name or description
router.get('/templates/search/:searchQuery', templateController.search);

module.exports = router;