import {body, check} from "express-validator";
import {nombreAlumnoExists, emailExists, nombreUsuarioExists, alumnoExiste} from "../helpers/db-validators.js";
import {validarCampos} from "./validar-campos.js";
import {deleteFileOnError} from "./delete-file-on-error.js";

export const registroAlumnoValidator = [
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("nombre").custom(nombreAlumnoExists),
    body("apellido").not().isEmpty().withMessage("Apellido obligatorio"),
    body("nombreUsuario").not().isEmpty().withMessage("Nombre de usuario obligatorio"),
    body("email").not().isEmpty().withMessage("Email obligatorio"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("curso").not().isEmpty().withMessage("Curso obligatorio"),
    body("nombreUsuario").custom(nombreUsuarioExists),
    validarCampos
]

export const getAlumnoByIdValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(alumnoExiste),
    validarCampos,
    deleteFileOnError

]

export const deleteAlumnoValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(alumnoExiste),
    validarCampos,
    deleteFileOnError

]

export const updateAlumnoValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(alumnoExiste),
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
