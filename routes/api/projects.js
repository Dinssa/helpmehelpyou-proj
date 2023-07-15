const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../../config/ensureLoggedIn');

const projectController = require('../../controllers/api/project');

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: The project to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       '200':
 *         description: The created project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.post('/', ensureLoggedIn, projectController.create);

/**
 * @swagger
 * /api/projects/all:
 *   get:
 *     summary: Get all projects
 *     description: Retrieves all projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No projects found.
 */
router.get('/all', ensureLoggedIn, projectController.index);

/**
 * @swagger
 * /api/projects/all:
 *   delete:
 *     summary: Delete all projects
 *     description: Deletes all projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Projects deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               acknowledged: true
 *               deletedCount: 13
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates whether the operation was acknowledged by the server.
 *                 deletedCount:
 *                   type: number
 *                   description: The number of projects that were deleted.
 *       '401':
 *         description: Unauthorized
 */
router.delete('/all', ensureLoggedIn, projectController.deleteAll);

/**
 * @swagger
 * /api/projects/user:
 *   get:
 *     summary: Get all projects that belong to the user
 *     description: Retrieves all projects that belong to the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All projects that belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No projects found.
 */
router.get('/user', ensureLoggedIn, projectController.userIndex);

/**
 * @swagger
 * /api/projects/user/nonarchived:
 *   get:
 *     summary: Get all non-archived projects that belong to the user
 *     description: Retrieves all non-archived projects that belong to the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All non-archived projects that belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.get('/user/nonarchived', ensureLoggedIn, projectController.userIndexNonArchived);

/**
 * @swagger
 * /api/projects/user/archived:
 *   get:
 *     summary: Get all archived projects that belong to the user
 *     description: Retrieves all archived projects that belong to the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: All archived projects that belong to the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.get('/user/archived', ensureLoggedIn, projectController.userIndexArchived);

/**
 * @swagger
 * /api/projects/user:
 *   delete:
 *     summary: Delete all user owned projects
 *     description: Deletes all projects owned by the authenticated user.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Projects deleted successfully.
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
 *                   description: The number of projects that were deleted.
 *       '401':
 *         description: Unauthorized
 */
router.delete('/user', ensureLoggedIn, projectController.userDeleteAll);

/**
 * @swagger
 * /api/projects/search:
 *   get:
 *     summary: Search for projects by name or description
 *     description: Searches for projects that match the specified search query in their name or description.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: The search query to match against project names and descriptions.
 *     responses:
 *       '200':
 *         description: Projects that match the search query.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       '401':
 *          description: Unauthorized
 */
router.get('/search', ensureLoggedIn, projectController.search);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Retrieves a single project by ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Project not found.
 */
router.get('/:id', ensureLoggedIn, projectController.show);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Updates a single project by ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated project.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       '200':
 *         description: The updated project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Project not found.
 */
router.put('/:id', ensureLoggedIn, projectController.update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Deletes a single project by ID.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Project deleted successfully.
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Project not found.
 */
router.delete('/:id', ensureLoggedIn, projectController.delete);

/**
 * @swagger
 * /api/projects/addform/{projectId}/{templateId}:
 *   post:
 *     summary: Add a form to a project
 *     description: Adds a form to the specified project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to add the form to.
 *       - in: path
 *         name: templateId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the template to use to create the form.
 *     responses:
 *       '200':
 *         description: The added form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.post('/addform/:projectId/:templateId', ensureLoggedIn, projectController.addForm);

/**
 * @swagger
 * /api/projects/deleteform/{projectId}/{formId}:
 *   delete:
 *     summary: Delete a form from a project
 *     description: Deletes the specified form from the specified project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to delete the form from.
 *       - in: path
 *         name: formId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the form to delete.
 *     responses:
 *       '200':
 *         description: Forms deleted successfully.
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
 *                   description: The number of forms that were deleted.
 *       '401':
 *         description: Unauthorized
 */
router.delete('/deleteform/:projectId/:formId', ensureLoggedIn, projectController.deleteForm);

/**
 * @swagger
 * /api/projects/archive/{id}:
 *   put:
 *     summary: Archive a project
 *     description: Archives the specified project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to archive.
 *     responses:
 *       '200':
 *         description: The archived project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.put('/archive/:id', ensureLoggedIn, projectController.archive);

/**
 * @swagger
 * /api/projects/unarchive/{id}:
 *   put:
 *     summary: Unarchive a project
 *     description: Unarchives the specified project.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to unarchive.
 *     responses:
 *       '200':
 *         description: The unarchived project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.put('/unarchive/:id', ensureLoggedIn, projectController.unarchive);

/**
 * @swagger
 * /api/projects/clone/{id}:
 *   post:
 *     summary: Clone a project
 *     description: Clones the specified project by creating a new project with the same name, description, and forms.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the project to clone.
 *     responses:
 *       '200':
 *         description: The cloned project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       '401':
 *         description: Unauthorized
 */
router.post('/clone/:id', ensureLoggedIn, projectController.clone);

module.exports = router;