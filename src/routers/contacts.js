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

import { isValidId } from '../middlewares/isValidId.js';

export const contactsRouter = Router();

contactsRouter.get('/', controllerWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  controllerWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  controllerWrapper(addContactController),
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  controllerWrapper(putContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  controllerWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  controllerWrapper(deleteContactController),
);
