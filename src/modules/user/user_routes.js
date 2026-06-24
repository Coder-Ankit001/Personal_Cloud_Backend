import express from 'express';
import { prisma } from '../../db.js'

import { tokenRefresh } from './user_controllers.js';
import { registerUser, loginUser, logoutUser } from './user_controllers.js';

const router = express.Router();

const saltRounds = 10

router.get('/me', (req, res) => {
  res.send('User route is working!');
});

// Refresh Token
router.post('/token', tokenRefresh)

// Register User
router.post('/register', registerUser)


// Login User
router.post('/login', loginUser)

// Logout USer
router.post('/logout', logoutUser)

export default router;