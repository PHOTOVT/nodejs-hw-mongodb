import { contactTypeList } from '../../constants/contacts.js';

const parseBoolean = (value) => value === 'true';

export const parseContactFilterParams = ({ isFavourite, contactType }) => {
  const filters = {};

  if (contactType && contactTypeList.includes(contactType)) {
    filters.contactType = contactType;
  }

  if (isFavourite !== undefined) {
    filters.isFavourite = parseBoolean(isFavourite);
  }

  return filters;
};
