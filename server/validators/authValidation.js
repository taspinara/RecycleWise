import Joi from 'joi';

export const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .required()
    .messages({
      'string.empty': 'First name is required.',
      'string.min': 'First name must be at least 2 characters.',
      'string.max': 'First name must be at most 40 characters.',
    }),

  lastName: Joi.string()
    .min(2)
    .max(40)
    .required()
    .messages({
      'string.empty': 'Last name is required.',
      'string.min': 'Last name must be at least 2 characters.',
      'string.max': 'Last name must be at most 40 characters.',
    }),

  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.empty': 'Username is required.',
      'string.alphanum': 'Username can only contain letters and numbers.',
      'string.min': 'Username must be at least 3 characters.',
      'string.max': 'Username must be at most 20 characters.',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please enter a valid email address.',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters long.',
    }),

  // confirmPassword: Joi.any()
  //   .valid(Joi.ref('password'))
  //   .required()
  //   .messages({
  //     'any.only': 'Passwords do not match.',
  //     'any.required': 'Please confirm your password.',
  //   }),
});

export const loginSchema = Joi.object({
  identifier: Joi.string().required().messages({
    'string.empty': 'Email or username is required.',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});
