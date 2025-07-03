import { LegalReview } from '../models/legalReview.js';

export const getAllReviews = async () => LegalReview.findAll();
export const getReviewsByContractId = async (contract_id) => LegalReview.findAll({ where: { contract_id } });
export const createReview = async (data) => LegalReview.create(data); 