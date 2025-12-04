import express from "express";
import {createAdherent, getAdherents} from "../controllers/adherentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createAdherent);
router.get("/", protect, authorize("pro", "admin", "user"), getAdherents)

export default router;