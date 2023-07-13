const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const formController = require('../../controllers/api/form');

/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Get all forms
 *     description: Retrieves all forms.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An array of forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.get('/forms', ensureLoggedIn, formController.index);

/**
 * @swagger
 * /api/forms/user:
 *   get:
 *     summary: Get all forms belonging to the user
 *     description: Retrieves all forms belonging to the currently logged in user.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An array of forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.get('/forms/user', ensureLoggedIn, formController.userIndex);

/**
 * @swagger
 * /api/forms/nonarchived:
 *   get:
 *     summary: Get all non-archived forms belonging to the user
 *     description: Retrieves all non-archived forms belonging to the currently logged in user.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An array of non-archived forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.get('/forms/user/nonarchived', ensureLoggedIn, formController.userIndexNonArchived);

/**
 * @swagger
 * /api/forms/archived:
 *   get:
 *     summary: Get all archived forms belonging to the user
 *     description: Retrieves all archived forms belonging to the currently logged in user.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: An array of archived forms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.get('/forms/user/archived', ensureLoggedIn, formController.userIndexArchived);

/**
 * @swagger
 * /api/forms/{id}:
 *   get:
 *     summary: Get a form by ID
 *     description: Retrieves a single form by its ID.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Form not found.
 */
router.get('/forms/:id', ensureLoggedIn, formController.show);

/**
 * @swagger
 * /api/forms:
 *   post:
 *     summary: Create a new form
 *     description: Creates a new form.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Form object to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormInput'
 *     responses:
 *       '201':
 *         description: The created form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '400':
 *         description: Invalid form data.
 *       '401':
 *         description: Unauthorized
 */
router.post('/forms', ensureLoggedIn, formController.create);

/**
 * @swagger
 * /api/forms/{id}:
 *   put:
 *     summary: Update a form by ID
 *     description: Updates an existing form by its ID.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Form object to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FormInput'
 *     responses:
 *       '200':
 *         description: The updated form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Form not found.
 */
router.put('/forms/:id', ensureLoggedIn, formController.update);

/**
 * @swagger
 * /api/forms/{id}:
 *   delete:
 *     summary: Delete a form by ID
 *     description: Deletes an existing form by its ID.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Form deleted successfully.
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Form not found.
 */
router.delete('/forms/:id', ensureLoggedIn, formController.delete);

module.exports = router;