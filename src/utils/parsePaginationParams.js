const parseNumber = (value) => {
  const num = parseInt(value, 10);
  return Number.isNaN(num) ? undefined : num;
};

export const parsePaginationParams = (query) => {
  const page = parseNumber(query.page) || 1;
  const perPage = parseNumber(query.perPage) || 5;
  return { page, perPage };
};
