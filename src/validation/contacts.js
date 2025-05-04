import Joi from 'joi';
import { contactTypeList } from '../constants/contacts.js';

export const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Enter a name.',
    'string.min': 'The name must be at least 3 characters long.',
    'string.max': 'The name must be no longer than 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Enter a phone number.',
    'string.min': 'The phone number must be at least 3 characters long.',
    'string.max': 'The phone number must be no longer than 20 characters.',
  }),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'The name must be at least 3 characters long.',
    'string.max': 'The name must be no longer than 20 characters.',
  }),
  phoneNumber: Joi.string().min(3).max(20).optional().messages({
    'string.min': 'The phone number must be at least 3 characters long.',
    'string.max': 'The phone number must be no longer than 20 characters.',
  }),
  email: Joi.string().email().optional(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
