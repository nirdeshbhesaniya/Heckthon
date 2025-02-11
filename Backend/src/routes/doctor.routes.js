import express from "express";
import { getSingaleUser, getAllUser, deleteUser, updatedUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", getSingaleUser);
router.get("/", getAllUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);

export default router;
