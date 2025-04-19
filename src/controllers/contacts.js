import createError from 'http-errors';
import { getContacts, getContactsById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
    res.status(500).json({
      message: err.message,
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
    next(err);
};
