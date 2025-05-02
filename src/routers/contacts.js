import { Router } from 'express';

import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  putContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { controllerWrapper } from '../utils/controllerWrapper.js';

import { validateBody } from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

import { isValidObjectId } from 'mongoose';

export const contactsRouter = Router();

contactsRouter.get('/', controllerWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidObjectId,
  controllerWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  controllerWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidObjectId,
  validateBody(contactAddSchema),
  controllerWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidObjectId,
  validateBody(contactUpdateSchema),
  controllerWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidObjectId,
  controllerWrapper(deleteContactController),
);
