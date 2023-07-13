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

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get all templates
 *     description: Retrieves all templates.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       '401':
 *         description: Unauthorized
 */
router.get('/templates', templateController.index);

/**
 * @swagger
 * /api/templates/user:
 *   get:
 *     summary: Get all user templates
 *     description: Retrieves all templates belonging to the authenticated user.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of user templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No templates found
 */
router.get('/templates/user', ensureLoggedIn, templateController.userIndex);

/**
 * @swagger
 * /api/templates/default:
 *   get:
 *     summary: Get all default templates
 *     description: Retrieves all default templates.
 *     tags:
 *       - Templates
 *     responses:
 *       '200':
 *         description: A list of default templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *      '404':
 *        description: No default templates found
 */
router.get('/templates/default', templateController.defaultIndex);

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Get a template by ID
 *     description: Retrieves a single template by ID.
 *     tags:
 *       - Templates
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single template.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Template not found.
 */
router.get('/templates/:id', templateController.show);

/**
 * @swagger
 * /api/templates/{id}:
 *   put:
 *     summary: Update a template by ID
 *     description: Updates a single template by ID.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: template
 *         description: The template to update.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Template'
 *     responses:
 *       '200':
 *         description: The updated template.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Template not found.
 */
router.put('/templates/:id', ensureLoggedIn, templateController.update);

/**
 * @swagger
 * /api/templates/{id}:
 *   delete:
 *     summary: Delete a template by ID
 *     description: Deletes a single template by ID.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the template to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Template deleted successfully.
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Template not found.
 */
router.delete('/templates/:id', ensureLoggedIn, templateController.delete);

/**
 * @swagger
 * /api/templates/search/{searchQuery}:
 *   get:
 *     summary: Search for templates by name or description
 *     description: Searches for templates by name or description.
 *     tags:
 *       - Templates
 *     parameters:
 *       - in: path
 *         name: searchQuery
 *         required: true
 *         description: The search query to use.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of templates matching the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 */router.get('/templates/search/:searchQuery', templateController.search);

module.exports = router;