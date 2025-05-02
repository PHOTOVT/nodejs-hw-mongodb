import ContactCollection from '../db/models/Contact.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async (page = 1, perPage = 10) => {
  const skip = (page - 1) * perPage;

  const contacts = await ContactCollection.find().skip(2).limit(3);
  const total = await ContactCollection.find().countDocuments();

  const paginationData = calcPaginationData({ page, perPage, total });

  return {
    contacts,
    total,
  };
};

export const getContactsById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (
  contactId,
  payload,
  options = { upsert: false },
) => {
  const { upsert } = options;

  const updatedContact = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      upsert,
      includeResultMetadata: true,
    },
  );

  if (!updatedContact) return null;

  return updatedContact;
};

export const deleteContactById = (contactId) =>
  ContactCollection.findByIdAndDelete(contactId);
