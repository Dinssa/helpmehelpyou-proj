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
 *             $ref: '#/components/schemas/TemplateInput'
 *     responses:
 *       '200':
 *         description: Created a new template
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Unauthorized
 */
router.post('/', ensureLoggedIn, templateController.create);

/**
 * @swagger
 * /api/templates/all:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Get all templates
 *     description: Retrieves all templates.
 *     tags:
 *       - Templates
 *     responses:
 *       '200':
 *         description: A list of templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Unauthorized
 */
router.get('/all', templateController.index);

/**
 * @swagger
 * /api/templates/all:
 *   delete:
 *     summary: Delete all templates
 *     description: Deletes all templates.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Templates deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               deletedCount: 2
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of templates that were deleted from the database.
 *       '404':
 *         description: Cannot find templates to delete.
 */
router.delete('/all', ensureLoggedIn, templateController.deleteAll);

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
 *       '404':
 *         description: No templates found.
 */
router.get('/user', ensureLoggedIn, templateController.userIndex);

/**
 * @swagger
 * /api/templates/deleteall:
 *   delete:
 *     summary: Delete all user templates
 *     description: Deletes all templates belonging to the authenticated user.
 *     tags:
 *       - Templates
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User templates deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               deletedCount: 5
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of templates that were deleted.
 *       '401':
 *         description: Unauthorized
 */
router.delete('/user', ensureLoggedIn, templateController.userDeleteAll);

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
 *       '404':
 *         description: No default templates found.
 */
router.get('/default', templateController.defaultIndex);

/**
 * @swagger
 * /api/templates/search:
 *   get:
 *     security:
 *       - Bearer: []
 *     summary: Search for templates by name or description
 *     description: Searches for templates by name or description.
 *     tags:
 *       - Templates
 *     parameters:
 *       - in: query
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
 */
router.get('/search', templateController.search);

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
router.get('/:id', templateController.show);

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
 *           $ref: '#/components/schemas/TemplateInput'
 *     responses:
 *       '200':
 *         description: The updated template.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Template not found.
 */
router.put('/:id', ensureLoggedIn, templateController.update);



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
 *       '200':
 *         description: Template deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               deletedCount: 1
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of templates that were deleted.
 *       '404':
 *         description: Template not found.
 */
router.delete('/:id', ensureLoggedIn, templateController.delete);


module.exports = router;