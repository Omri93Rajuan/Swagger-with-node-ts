import express, { Request, Response } from "express";
import {
  getAllData,
  getData,
  createData,
  deleteData,
  updateData,
} from "../service/dataAccessDataService";

import { handleError } from "../../utils/handleErrors";

const router = express.Router();

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get all users
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   password:
 *                     type: string
 *                     example: "hashed_password_here"
 *                   role:
 *                     type: string
 *                     example: "user"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-10T10:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-10T12:00:00Z"
 */
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getAllData();
    res.send(data);
  } catch (error: any) {
    handleError(res, error.status || 403, error.message);
  }
});

/**
 * @swagger
 * /data/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   example: "hashed_password_here"
 *                 role:
 *                   type: string
 *                   example: "user"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T10:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T12:00:00Z"
 */
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getData(parseInt(id));
    res.send(data);
  } catch (error: any) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Create new user
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "hashed_password_here"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   example: "hashed_password_here"
 *                 role:
 *                   type: string
 *                   example: "user"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T10:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T12:00:00Z"
 */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newData = req.body;
    await createData(newData);
    res.status(201).send("User created successfully");
  } catch (error: any) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * @swagger
 * /data/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Name"
 *               email:
 *                 type: string
 *                 example: "updated.email@example.com"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Updated Name"
 *                 email:
 *                   type: string
 *                   example: "updated.email@example.com"
 *                 role:
 *                   type: string
 *                   example: "admin"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T10:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-10-10T12:00:00Z"
 */
router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const editedData = await updateData(parseInt(id), updatedData);
    res.send(editedData);
  } catch (error: any) {
    handleError(res, error.status || 500, error.message);
  }
});

/**
 * @swagger
 * /data/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 */
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedData = await deleteData(parseInt(id));
    res.send(deletedData);
  } catch (error: any) {
    handleError(res, error.status || 500, error.message);
  }
});

export default router;
