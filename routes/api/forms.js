const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const formController = require('../../controllers/api/form');

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
 *       '404':
 *         description: Form not created.
 */
router.post('/', ensureLoggedIn, formController.create);

/**
 * @swagger
 * /api/forms/all:
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
 *       '404':
 *         description: No forms found.
 */
router.get('/all', ensureLoggedIn, formController.index);

/**
 * @swagger
 * /api/forms/all:
 *   delete:
 *     summary: Delete all forms
 *     description: Deletes all forms.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Forms deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               deletedCount: 10
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of forms that were deleted.
 *       '404':
 *         description: No forms found.
 */
router.delete('/all', ensureLoggedIn, formController.deleteAll);

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
 *       '404':
 *         description: No forms found.
 */
router.get('/user', ensureLoggedIn, formController.userIndex);

/**
 * @swagger
 * /api/forms/user/nonarchived:
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
 *       '404':
 *         description: No forms found.
 */
router.get('/user/nonarchived', ensureLoggedIn, formController.userIndexNonArchived);

/**
 * @swagger
 * /api/forms/user/archived:
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
 *       '404':
 *         description: No forms found.
 */
router.get('/user/archived', ensureLoggedIn, formController.userIndexArchived);

/**
 * @swagger
 * /api/forms/uuid/{id}:
 *   get:
 *     summary: Get a form by UUID
 *     description: Retrieves a single form by its UUID.
 *     tags:
 *       - Forms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the form to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '404':
 *         description: Form not found.
 */
router.get('/uuid/:id', ensureLoggedIn, formController.showByUuid)

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
 *       '404':
 *         description: Form not found.
 */
router.get('/:id', ensureLoggedIn, formController.show);

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
router.put('/:id', ensureLoggedIn, formController.update);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the delete operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of forms deleted.
 *       '404':
 *         description: Form not found.
 */
router.delete('/:id', ensureLoggedIn, formController.delete);

module.exports = router;