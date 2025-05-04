import ContactCollection from '../db/models/Contact.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

import { contactSortList } from '../constants/contacts.js';

export const getContacts = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = 'asc',
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = ContactCollection.find();

  if (filters.contactType) {
    contactQuery.where('contactType').equals(filters.contactType);
  }

  if (filters.isFavourite !== 'boolean') {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({
    page,
    perPage,
    totalItems,
  });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
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
