import multer from "multer";
import express from "express";

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Store images inside 'public/uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Initialize Multer
export const upload = multer({ storage });


export default router;
