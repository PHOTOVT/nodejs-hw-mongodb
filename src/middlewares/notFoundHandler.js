import createHttpError from 'http-errors';

export const notFoundHandler = (req, res) => {
  const err = createHttpError(404, 'Contact was not found.');
  res.status(err.status).json({ message: err.message });
};
