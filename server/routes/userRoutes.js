import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { changePassword, updateProfile } from '../controllers/userController.js';
import { passwordChangeSchema } from '../validators/passwordChangeSchema.js';
import { profileUpdateSchema } from '../validators/profileUpdateSchema.js';

const router = express.Router();

router.post(
  '/change-password',
  requireAuth,
  validateRequest(passwordChangeSchema),
  changePassword
);

router.patch(
  '/update-profile',
  requireAuth,
  validateRequest(profileUpdateSchema),
  updateProfile
);

export default router;
