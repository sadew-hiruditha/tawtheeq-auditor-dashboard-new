import { Contract } from '../models/contract.js';

export const getAllContracts = async () => Contract.findAll();
export const getContractById = async (id) => Contract.findByPk(id);
export const createContract = async (data) => Contract.create(data);
export const updateContract = async (id, data) => {
  const contract = await Contract.findByPk(id);
  if (!contract) return null;
  await contract.update(data);
  return contract;
};
export const deleteContract = async (id) => {
  const contract = await Contract.findByPk(id);
  if (!contract) return null;
  await contract.destroy();
  return true;
}; 