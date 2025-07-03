import * as userRepository from '../repositories/userRepository.js';

export const getAllUsers = () => userRepository.getAllUsers();
export const getUserById = (id) => userRepository.getUserById(id);
export const createUser = (data) => userRepository.createUser(data);
export const updateUser = (id, data) => userRepository.updateUser(id, data);
export const deleteUser = (id) => userRepository.deleteUser(id); 