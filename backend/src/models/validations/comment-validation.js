import { header, param, body } from "express-validator";
import { applyValidations } from "../../middlewares/applyvalidator.js";

export const createCommentValidation = [
    body("description")
    .isString().withMessage("El campo debe ser un string"),
    
    applyValidations,
];

export const listCommentValidation = [
    header("authorization").exists(),

    applyValidations
];