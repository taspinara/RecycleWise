import Joi from 'joi';

export const passwordChangeSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required.',
  }),
  newPassword: Joi.string().min(6).required().messages({
    'string.empty': 'New password is required.',
    'string.min': 'New password must be at least 6 characters.',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({
    'any.only': 'New passwords do not match.',
    'any.required': 'Please confirm your new password.',
  }),
});
