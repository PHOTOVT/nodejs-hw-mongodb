import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactsById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (
  contactId,
  payload,
  options = { upsert },
) => {
  const { upsert } = options;
  const rawResult = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      upsert,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (contactId) =>
  ContactCollection.findByIdAndDelete(contactId);
