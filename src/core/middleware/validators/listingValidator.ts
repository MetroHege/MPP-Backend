import { body } from "express-validator";
import { validateId } from "./universal";

const validateType = body("type").isString().withMessage("Type must be a string");

const validateCategory = body("category").isNumeric().withMessage("Category must be a number");

const validateQuality = body("quality").isNumeric().withMessage("Quality must be a number");

const validatePrice = body("price").isNumeric().withMessage("Price must be a number");

const validateTitle = body("title").isString().withMessage("Title must be a string");

const validateDescription = body("description")
    .isString()
    .withMessage("Description must be a string");

const validatePostListing = [
    validateType,
    validateCategory,
    validateQuality,
    validatePrice,
    validateTitle,
    validateDescription,
];

const validatePutListing = [
    validateType.optional(),
    validateCategory.optional(),
    validateQuality.optional(),
    validatePrice.optional(),
    validateTitle.optional(),
    validateDescription.optional(),
];

const validateGetListing = [validateId];

const validatePutListingById = [validateId, ...validatePutListing];

const validateDeleteListingById = [validateId];

export {
    validatePostListing,
    validatePutListing,
    validateGetListing,
    validatePutListingById,
    validateDeleteListingById,
};
