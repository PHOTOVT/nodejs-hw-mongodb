import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

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
