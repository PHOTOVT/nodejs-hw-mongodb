import { Router } from 'express';

import {
  getContactsController,
  getContactsByIdController,
} from '../controllers/contacts.js';

import { controllerWrapper } from '../utils/controllerWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/', controllerWrapper(getContactsController));
contactsRouter.get('/:contactId', controllerWrapper(getContactsByIdController));
