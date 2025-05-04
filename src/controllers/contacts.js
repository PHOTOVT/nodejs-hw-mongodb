import createHttpError from 'http-errors';

import {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

import { contactSortFields } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortFields);
  const filters = parseContactFilterParams(req.query);

  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });

  res.json({
    status: 200,
    message: 'The contacts were successfully found!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);

  if (!data) {
    throw createHttpError(404, `A contact with id=${contactId} was not found.`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'A contact has been successfully created.',
    data,
  });
};

export const putContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContact(contactId, req.body, { upsert: true });

  if (!data) {
    throw createHttpError(
      500,
      `Failed to upsert contact with id=${contactId}.`,
    );
  }

  res.status(200).json({
    status: 200,
    message: 'The contact has been successfully upserted.',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContact(contactId, req.body);

  if (!data) {
    throw createHttpError(404, `A contact with id=${contactId} was not found.`);
  }

  res.status(200).json({
    status: 200,
    message: 'The contact was successfully updated.',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await deleteContactById(contactId);

  if (!data) {
    throw createHttpError(404, `A contact with id=${contactId} was not found.`);
  }

  res.status(204).send();
};
