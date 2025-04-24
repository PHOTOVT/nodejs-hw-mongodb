import createError from 'http-errors';
import {
  getContacts,
  getContactsById,
  addContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await getContacts();

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
    throw createError(404, `A contact with id=${contactId} was not found.`);
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

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { data, isNew } = await updateContact(contactId, req.body, {
    upsert: true,
  });
  const status = isNew ? 201 : 200;

  res.json({
    status,
    message: 'The contact has been successfully updated.',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);

  if (!data) {
    throw createError(404, `A contact with id=${contactId} was not found.`);
  }

  res.json({
    status: 200,
    message: 'The contact was successfully updated.',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await deleteContactById(contactId);

  if (!data) {
    throw createError(404, `A contact with id=${contactId} was not found.`);
  }

  res.status(204).send();
};
