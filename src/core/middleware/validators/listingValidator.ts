import { body } from "express-validator";
import { validateId } from "./universal";
import { getCategoryById } from "../../../api/models/categoryModel";

const validateType = (optional: boolean) =>
    body("type")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Type must be a string");

const validateCategory = (optional: boolean) =>
    body("category")
        .optional(optional)
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("Category must be a number")
        .custom(async value => {
            const category = await getCategoryById(value);
            if (!category) throw new Error("Category does not exist");
        });

const validateQuality = (optional: boolean) =>
    body("quality")
        .optional(optional)
        .trim()
        .notEmpty()
        .isNumeric()
        .custom(value => {
            if (value < 1 || value > 5) throw new Error("Quality must be between 1 and 5");
            return true;
        })
        .withMessage("Quality must be a valid number between 1 and 5");

const validatePrice = (optional: boolean) =>
    body("price")
        .optional(optional)
        .trim()
        .notEmpty()
        .isNumeric()
        .withMessage("Price must be a number");

const validateTitle = (optional: boolean) =>
    body("title")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Title must be a string");

const validateDescription = (optional: boolean) =>
    body("description")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Description must be a string");

const createListingValidationChain = (optional = false) => [
    validateType(optional),
    validateCategory(optional),
    validateQuality(optional),
    validatePrice(optional),
    validateTitle(optional),
    validateDescription(optional),
];

const validatePostListing = createListingValidationChain();
const validatePutListing = createListingValidationChain(true);

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
