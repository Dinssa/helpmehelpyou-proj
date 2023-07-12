const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /api/users:
 *   post:
 *     summary: Creates a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorised. Invalid credentials.
 */
router.post('/', usersCtrl.create);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user.
 *     tags: [Users]
 *     description: Authenticates a user by checking their email and password against the database, and returns a JSON Web Token (JWT) if the credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.post('/login', usersCtrl.login);

/**
 * @swagger
 * /api/users/check-token:
 *   get:
 *     summary: Check the validity of a user's token.
 *     tags: [Users]
 *     description: Checks the validity of a user's JSON Web Token (JWT) by returning the expiration time of the token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exp:
 *                   type: number
 *                   description: The expiration time of the user's token
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: The error message
 */
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;