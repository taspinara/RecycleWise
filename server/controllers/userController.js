import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// Change Password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) throw new ErrorResponse('User not found', 404);

  const match = await user.comparePassword(oldPassword);
  if (!match) throw new ErrorResponse('Current password is incorrect.', 400);

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password changed successfully.' });
});

// This function allows users to update their profile information such as username, email, first name, and last name.      
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;
  const user = await User.findById(req.user.id);

  if (!user) throw new ErrorResponse('User not found', 404);

  // Check for unique fields
  if (updates.email && updates.email !== user.email) {
    const exists = await User.findOne({ email: updates.email });
    if (exists) throw new ErrorResponse('Email already in use', 400);
  }

  if (updates.username && updates.username !== user.username) {
    const exists = await User.findOne({ username: updates.username });
    if (exists) throw new ErrorResponse('Username already in use', 400);
  }

  Object.assign(user, updates);
  await user.save();

  res.json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
    message: 'Profile updated successfully.',
  });
});