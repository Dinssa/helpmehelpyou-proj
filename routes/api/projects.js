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
 *             $ref: '#/components/schemas/Project'
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
router.post('/projects', ensureLoggedIn, projectController.create);

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
router.get('/projects/:id', ensureLoggedIn, projectController.show);

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
router.put('/projects/:id', ensureLoggedIn, projectController.update);

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
router.delete('/projects/:id', ensureLoggedIn, projectController.delete);

/**
 * @swagger
 * /api/projects:
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
router.get('/projects', ensureLoggedIn, projectController.index);

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
router.get('/projects/user', ensureLoggedIn, projectController.userIndex);

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
router.get('/projects/user/nonarchived', ensureLoggedIn, projectController.userIndexNonArchived);

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
router.get('/projects/user/archived', ensureLoggedIn, projectController.userIndexArchived);

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
 *       - in: path
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
router.get('/projects/search/:searchQuery', ensureLoggedIn, projectController.search);

/**
 * @swagger
 * /api/projects/{id}/forms:
 *   post:
 *     summary: Add a form to a project
 *     description: Adds a form to the specified project.
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
 *         description: The ID of the project to add the form to.
 *       - in: path
 *         name: templatetId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the template to use to create the form to.
 *     responses:
 *       '201':
 *         description: The added form.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Form'
 *       '401':
 *         description: Unauthorized
 */
router.post('/projects/:id/addform/:templateId', ensureLoggedIn, projectController.addForm);

/**
 * @swagger
 * /api/projects/{id}/forms/{formId}:
 *   delete:
 *     summary: Delete a form from a project
 *     description: Deletes the specified form from the specified project.
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
 *         description: The ID of the project to delete the form from.
 *       - in: path
 *         name: formId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the form to delete.
 *     responses:
 *       '200':
 *         description: The form was successfully deleted.
 *       '401':
 *         description: Unauthorized
 */
router.delete('/projects/:id/deleteform/:formId', ensureLoggedIn, projectController.deleteForm);

/**
 * @swagger
 * /api/projects/{id}/archive:
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
router.put('/projects/:id/archive', ensureLoggedIn, projectController.archive);

/**
 * @swagger
 * /api/projects/{id}/unarchive:
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
router.put('/projects/:id/unarchive', ensureLoggedIn, projectController.unarchive);

/**
 * @swagger
 * /api/projects/{id}/clone:
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
router.post('/projects/:id/clone', ensureLoggedIn, projectController.clone);

module.exports = router;