import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// REST
router.get("/", auth, getUsers);
router.post("/", createUser);

export default router;
