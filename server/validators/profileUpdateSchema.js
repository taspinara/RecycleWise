import Joi from 'joi';

export const profileUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(40).optional(),
  lastName: Joi.string().min(2).max(40).optional(),
  username: Joi.string().alphanum().min(3).max(20).optional(),
  email: Joi.string().email().optional(),
});
