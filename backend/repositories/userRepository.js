import { User } from '../models/user.js';

export const getAllUsers = async () => User.findAll();
export const getUserById = async (id) => User.findByPk(id);
export const createUser = async (data) => User.create(data);
export const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
};
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
}; 