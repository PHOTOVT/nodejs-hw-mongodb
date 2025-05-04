import { contactSortList } from '../constants/contacts.js';

import { contactSortFields } from '../db/models/Contact.js';

export const parseSortParams = (
  { sortBy, sortOrder } = {},
  contactSortFields = [],
) => {
  const parsedSortBy = contactSortFields.includes(sortBy) ? sortBy : '_id';
  const parsedSortOrder = contactSortList.includes(sortOrder)
    ? sortOrder
    : contactSortList[0];

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
