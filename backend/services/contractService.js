import * as contractRepository from '../repositories/contractRepository.js';

export const getAllContracts = () => contractRepository.getAllContracts();
export const getContractById = (id) => contractRepository.getContractById(id);
export const createContract = (data) => contractRepository.createContract(data);
export const updateContract = (id, data) => contractRepository.updateContract(id, data);
export const deleteContract = (id) => contractRepository.deleteContract(id); 