import { body } from "express-validator";
import { findUser } from "../../../api/models/userModel";
import { validateId } from "./universal";

const validateUsername = (optional: boolean) =>
    body("username")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters long")
        .custom(async value => {
            const user = await findUser({ username: value });
            if (user) throw new Error("Username already in use");
        });

const validateFirstName = (optional: boolean) =>
    body("firstName")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("First name must be a string");

const validateLastName = (optional: boolean) =>
    body("lastName")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Last name must be a string");

const validatePhone = () =>
    body("phone")
        .optional()
        .trim()
        .notEmpty()
        .isString()
        .isMobilePhone("any", { strictMode: false })
        .withMessage("Phone number must be valid");

const validateEmail = (optional: boolean) =>
    body("email")
        .optional(optional)
        .trim()
        .notEmpty()
        .isEmail()
        .withMessage("Email must be valid")
        .custom(async value => {
            const user = await findUser({ email: value });
            if (user) throw new Error("Email already in use");
        });

const validateCity = (optional: boolean) =>
    body("city")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("City must be a string");

const validatePassword = (optional: boolean) =>
    body("password")
        .optional(optional)
        .trim()
        .notEmpty()
        .isString()
        .withMessage("Password must be a string");

const createValidationChain = (optional = false) => [
    validateUsername(optional),
    validateFirstName(optional),
    validateLastName(optional),
    validatePhone(),
    validateEmail(optional),
    validateCity(optional),
    validatePassword(optional),
];

const validatePostUser = createValidationChain();
const validatePutUser = createValidationChain(true);

const validateGetUser = [validateId];

const validatePutUserById = [validateId, ...validatePutUser];

const validateDeleteUserById = [validateId];

export {
    validatePostUser,
    validatePutUser,
    validateGetUser,
    validatePutUserById,
    validateDeleteUserById,
};
