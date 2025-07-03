import express from 'express';
import userRoutes from './user.js';
import contractRoutes from './contract.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/contracts', contractRoutes);
// Add more entity routes here

export default router; 