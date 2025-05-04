import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidId = (req, next) => {
    const {contactId} = req.params;

    if(!isValidObjectId(contactId)) {
        return next(createHttpError(404, `${id} is not a valid id.`))
    }
    next();
}
