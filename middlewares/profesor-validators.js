import {body, check} from "express-validator";
import {nombreProfesorExists, emailExists, nombreUsuarioExists, profesorExiste} from "../helpers/db-validators.js";
import {validarCampos} from "./validar-campos.js";
import {deleteFileOnError} from "./delete-file-on-error.js";

export const registroProfesorValidator = [
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("nombre").custom(nombreProfesorExists),
    body("apellido").not().isEmpty().withMessage("Apellido obligatorio"),
    body("nombreUsuario").not().isEmpty().withMessage("Nombre de usuario obligatorio"),
    body("email").not().isEmpty().withMessage("Email obligatorio"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("curso").not().isEmpty().withMessage("Curso obligatorio"),
    body("nombreUsuario").custom(nombreUsuarioExists),
    validarCampos
];

export const getProfesorByIdValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(profesorExiste),
    validarCampos,
    deleteFileOnError

]

export const deleteProfesorValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(profesorExiste),
    validarCampos,
    deleteFileOnError

]

export const updateProfesorValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(profesorExiste),
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("apellido").not().isEmpty().withMessage("Apellido obligatorio"),
    body("nombreUsuario").not().isEmpty().withMessage("Nombre de usuario obligatorio"),
    body("email").not().isEmpty().withMessage("Email obligatorio"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("curso").not().isEmpty().withMessage("Curso obligatorio"),
    body("nombreUsuario").custom(nombreUsuarioExists),
    validarCampos,
    deleteFileOnError

]
