import { param } from "express-validator";

const validateId = param("id").isInt().toInt().withMessage("invalid id");

export { validateId };
