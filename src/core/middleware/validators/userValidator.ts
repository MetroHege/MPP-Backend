import { Request, Response, NextFunction } from "express";
import ApiError from "../../classes/ApiError";
import { body } from "express-validator";
import { findUser } from "../../../api/models/userModel";
import { validateId } from "./universal";

const validateUsername = body("username")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long");

const validateFirstName = body("firstName").isString().withMessage("First name must be a string");

const validateLastName = body("lastName").isString().withMessage("Last name must be a string");

const validatePhone = body("phone")
    .isString()
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Phone number must be valid")
    .optional();

const validateEmail = body("email").isEmail().withMessage("Email must be valid");

const validateCity = body("city").isString().withMessage("City must be a string");

const validatePassword = body("password").isString().withMessage("Password must be a string");

const validateUsernameAndEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await findUser(req.body);
    if (user) return next(new ApiError(400, "Username or email already in use"));
    next();
};

const validatePostUser = [
    validateUsername,
    validateFirstName,
    validateLastName,
    validatePhone,
    validateEmail,
    validateCity,
    validatePassword,
];

const validatePutUser = [
    validateUsername.optional(),
    validateFirstName.optional(),
    validateLastName.optional(),
    validatePhone.optional(),
    validateEmail.optional(),
    validateCity.optional(),
    validatePassword.optional(),
];

const validateGetUser = [validateId];

const validatePutUserById = [validateId, ...validatePutUser];

const validateDeleteUserById = [validateId];

export {
    validateUsernameAndEmail,
    validatePostUser,
    validatePutUser,
    validateGetUser,
    validatePutUserById,
    validateDeleteUserById,
};
