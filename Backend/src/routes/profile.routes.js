// In your routes.js or equivalent file
import express from 'express';
import { getUserProfile } from './controllers/userController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Protected Route to Get User Profile
router.get('/api/v1/users/profile', verifyJWT, getUserProfile); // Authenticate the user before fetching profile

export default router;
