import createError from "http-errors";

export const notFoundHandler = (req, res) => {
  const err = createError(404, "Contact not found.");
  res.status(err.status).json({ message: err.message });
};
