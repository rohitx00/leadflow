import bcrypt from 'bcrypt';
import * as userRepository from './user.repository.js';

export const createUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const getAllUsers = async () => {
  return await userRepository.findAllUsers();
};

export const updateUserRole = async (targetUserId, newRole, requestingUserId) => {
  if (targetUserId === requestingUserId) {
    const error = new Error('You cannot change your own role');
    error.statusCode = 400;
    throw error;
  }
  
  const updatedUser = await userRepository.updateUserRole(targetUserId, newRole);
  if (!updatedUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const updateUserStatus = async (targetUserId, isActive, requestingUserId) => {
  if (targetUserId === requestingUserId) {
    const error = new Error('You cannot deactivate your own account');
    error.statusCode = 400;
    throw error;
  }
  
  const updatedUser = await userRepository.updateUserStatus(targetUserId, isActive);
  if (!updatedUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const deleteUser = async (targetUserId, requestingUserId) => {
  if (targetUserId === requestingUserId) {
    const error = new Error('You cannot delete your own account');
    error.statusCode = 400;
    throw error;
  }
  
  const deleted = await userRepository.deleteUser(targetUserId);
  if (!deleted) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  
  return true;
};
