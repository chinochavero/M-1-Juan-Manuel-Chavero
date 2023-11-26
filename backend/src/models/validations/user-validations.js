import { body } from "express-validator"

export const createUserValidations = [
  body("username")
    .notEmpty().withMessage("El campo no debe estar vacio")
    .isString().withMessage("El campo debe ser un string")
];


