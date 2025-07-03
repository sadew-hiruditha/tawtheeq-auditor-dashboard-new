import * as legalReviewService from '../services/legalReviewService.js';

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await legalReviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const getReviewsByContractId = async (req, res, next) => {
  try {
    const reviews = await legalReviewService.getReviewsByContractId(req.params.contract_id);
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const review = await legalReviewService.createReview(req.body);
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
}; 