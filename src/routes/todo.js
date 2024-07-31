import express from "express";
const router = express.Router();
import { isUser } from "../middleware/auth.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
  getTodo,
  deleteAllTodo,
} from "../controllers/todo.js";

/**
 * @swagger
 * paths:
 *   /todo/createTodo:
 *     post:
 *       summary: Create a new todo item
 *       tags:
 *         - TODO:
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: "Milk, Bread, Eggs"
 *       responses:
 *         '200':
 *           description: Successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f5f1b2c001f8e4c5d"
 *                   description:
 *                     type: string
 *                     example: "Milk, Bread, Eggs"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-31T12:34:56.789Z"
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Internal Server Error
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         heading:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["PENDING", "COMPLETED", "ONGOING"]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

router.post("/createTodo", isUser, createTodo);

/**
 * @swagger
 * paths:
 *   /todo/deleteTodo/{id}:
 *     delete:
 *       summary: Delete a specific todo item
 *       tags:
 *         - TODO:
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the todo item to delete
 *           schema:
 *             type: string
 *             example: "60c72b2f5f1b2c001f8e4c5d"
 *       responses:
 *         '200':
 *           description: Successfully deleted the todo item
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo deleted successfully"
 *         '404':
 *           description: Todo not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo not found"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */

router.delete("/deleteTodo/:id", isUser, deleteTodo);

/**
 * @swagger
 * paths:
 *   /todo/updateTodo/{id}:
 *     patch:
 *       summary: Update a specific todo item
 *       tags:
 *         - TODO:
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the todo item to update
 *           schema:
 *             type: string
 *             example: "60c72b2f5f1b2c001f8e4c5d"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: "Milk, Bread, Eggs"
 *       responses:
 *         '200':
 *           description: Successfully updated the todo item
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo updated successfully"
 *                   todo:
 *                     $ref: '#/components/schemas/Todo'
 *         '404':
 *           description: Todo not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo not found"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

router.patch("/updateTodo/:id", isUser, updateTodo);

/**
 * @swagger
 * paths:
 *   /todo/getTodo/{id}:
 *     get:
 *       summary: Get a specific todo item
 *       tags:
 *         - TODO:
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: The ID of the todo item to retrieve
 *           schema:
 *             type: string
 *             example: "60c72b2f5f1b2c001f8e4c5d"
 *       responses:
 *         '200':
 *           description: Successfully retrieved the todo item
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60c72b2f5f1b2c001f8e4c5d"
 *                   heading:
 *                     type: string
 *                     example: "Buy groceries"
 *                   description:
 *                     type: string
 *                     example: "Milk, Bread, Eggs"
 *                   status:
 *                     type: string
 *                     enum: ["PENDING", "COMPLETED", "ONGOING"]
 *                     example: "PENDING"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-31T12:34:56.789Z"
 *         '404':
 *           description: Todo not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo not found"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         heading:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["PENDING", "COMPLETED", "ONGOING"]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

router.get("/getTodo/:id", isUser, getTodo);

/**
 * @swagger
 * paths:
 *   /todo/getAllTodos:
 *     get:
 *       summary: Get all todo items for the authenticated user
 *       tags:
 *         - TODO:
 *       parameters:
 *         - name: page
 *           in: query
 *           required: false
 *           description: Page number for pagination
 *           schema:
 *             type: integer
 *             example: 1
 *         - name: limit
 *           in: query
 *           required: false
 *           description: Number of items per page
 *           schema:
 *             type: integer
 *             example: 12
 *       responses:
 *         '200':
 *           description: Successfully retrieved all todo items for the user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: object
 *                     properties:
 *                       pages:
 *                         type: integer
 *                         example: 5
 *                       total:
 *                         type: integer
 *                         example: 50
 *                       allTodo:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Todo'
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: "Internal server error"
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         heading:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: ["PENDING", "COMPLETED", "ONGOING"]
 *         createdAt:
 *           type: string
 *           format: date-time
 */
router.get("/getAllTodos", isUser, getAllTodos);

/**
 * @swagger
 * paths:
 *   /todo/deleteAllTodo:
 *     delete:
 *       summary: Delete all todo items for the authenticated user
 *       tags:
 *         - TODO:
 *       responses:
 *         '200':
 *           description: Successfully deleted all todo items for the user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "All todo items deleted successfully"
 *         '404':
 *           description: No todo items found for the user
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Todo not found"
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Internal server error"
 */
router.delete("/deleteAllTodo", isUser, deleteAllTodo);

export default router;
deleteTodo;
