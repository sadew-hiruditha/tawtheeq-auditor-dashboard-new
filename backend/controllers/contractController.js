import * as contractService from '../services/contractService.js';

export const getAllContracts = async (req, res, next) => {
  try {
    const contracts = await contractService.getAllContracts();
    res.json(contracts);
  } catch (err) {
    next(err);
  }
};

export const getContractById = async (req, res, next) => {
  try {
    const contract = await contractService.getContractById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    next(err);
  }
};

export const createContract = async (req, res, next) => {
  try {
    const contract = await contractService.createContract(req.body);
    res.status(201).json(contract);
  } catch (err) {
    next(err);
  }
};

export const updateContract = async (req, res, next) => {
  try {
    const contract = await contractService.updateContract(req.params.id, req.body);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    next(err);
  }
};

export const deleteContract = async (req, res, next) => {
  try {
    const result = await contractService.deleteContract(req.params.id);
    if (!result) return res.status(404).json({ error: 'Contract not found' });
    res.json({ message: 'Contract deleted' });
  } catch (err) {
    next(err);
  }
}; 