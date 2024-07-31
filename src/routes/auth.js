import express from "express";
const router = express.Router();
import { isUser } from "../middleware/auth.js";
import {
  register,
  login,
  logOut,
} from "../controllers/auth.js";

/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: User registration
 *       tags:
 *         - Auth
 *       description: Endpoint for user registration
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   example: Qusim
 *                   description: userName
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                   description: User's email
 *                 password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: User's password
 *       responses:
 *         '201':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User registered successfully
 *         '203':
 *           description: Validation error or user already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Email Already exists
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Internal Server Error
 */
router.route("/register").post(register);

/**
 * @swagger
 * paths:
 *   /auth/login:
 *     post:
 *       summary: User login
 *       tags:
 *         - Auth
 *       description: Endpoint for user  login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                   description: User's email
 *                 password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: User's password
 *       responses:
 *         '200':
 *           description: User logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: User logged in successfully
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         '203':
 *           description: Validation error or user not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Invalid Email & Password
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */

router.route("/login").post(login);

/**
 * @swagger
 * /auth/logOut:
 *   get:
 *     summary: Log out
 *     tags: [Auth]
 *     description: Endpoint for logging out user
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 */
router.route("/logOut").get(isUser, logOut);

export default router;
