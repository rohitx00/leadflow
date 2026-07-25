import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from './auth.repository.js';

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  if (user.isActive === false) {
    const error = new Error('Your account has been deactivated. Please contact an administrator.');
    error.statusCode = 403;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Omit password
  const { password: _, ...userWithoutPassword } = user;
  
  return { user: userWithoutPassword, token };
};
