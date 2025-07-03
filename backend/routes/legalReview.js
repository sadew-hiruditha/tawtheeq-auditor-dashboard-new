import express from 'express';
import * as legalReviewController from '../controllers/legalReviewController.js';

const router = express.Router();

// Get all reviews
router.get('/', legalReviewController.getAllReviews);
// Get reviews by contract ID
router.get('/:contract_id', legalReviewController.getReviewsByContractId);
// Create a new review
router.post('/', legalReviewController.createReview);

export default router; 