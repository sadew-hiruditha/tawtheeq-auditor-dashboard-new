import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Create user
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

export default router; 