import { Router } from 'express';

import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  upsertContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { controllerWrapper } from '../utils/controllerWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/', controllerWrapper(getContactsController));

contactsRouter.get('/:contactId', controllerWrapper(getContactsByIdController));

contactsRouter.post('/', controllerWrapper(addContactController));

contactsRouter.put('/:contactId', controllerWrapper(upsertContactController));

contactsRouter.patch('/:contactId', controllerWrapper(patchContactController));

contactsRouter.delete(
  '/:contactId',
  controllerWrapper(deleteContactController),
);
