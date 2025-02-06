import express from "express";
import {
    registerDoctor,
    loginDoctor,
    logoutDoctor,
    refreshAccessToken,
    changeDoctorPassword,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    approveDoctor,
  } from "../controllers/doctor.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = express.Router();

// ✅ Authentication Routes
router.post("/register", upload.fields([{ name: "photo", maxCount: 1 }]), registerDoctor);
router.post("/login", loginDoctor);
router.post("/logout", verifyJWT, logoutDoctor);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changeDoctorPassword);

// ✅ Doctor Management Routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.put("/:id", verifyJWT, updateDoctor);
router.delete("/:id", verifyJWT, deleteDoctor);
router.patch("/:id/approve", verifyJWT, approveDoctor);

export default router;
