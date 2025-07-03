import * as legalReviewRepository from '../repositories/legalReviewRepository.js';

export const getAllReviews = () => legalReviewRepository.getAllReviews();
export const getReviewsByContractId = (contract_id) => legalReviewRepository.getReviewsByContractId(contract_id);
export const createReview = (data) => legalReviewRepository.createReview(data); 