import { body, check } from "express-validator";
import { emailExists, nombreUsuarioExists, usuarioExiste } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js"
import { deleteFileOnError } from "./delete-file-on-error.js"

export const registerValidator = [
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("apellido").not().isEmpty().withMessage("Apellido obligatorio"),
    body("nombreUsuario").not().isEmpty().withMessage("Nombre de usuario obligatorio"),
    body("email").not().isEmpty().withMessage("Email obligatorio"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("nombreUsuario").custom(nombreUsuarioExists),
    body("contraseña"),
    validarCampos

] 

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Email invalido"),
    body("nombreUsuario").optional().isString().withMessage("Nombre de usuario invalido"),
    body("contraseña").isLength({min: 4}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos
]

export const getUsuarioByIdValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(usuarioExiste),
    validarCampos,
    deleteFileOnError

]

export const deleteUsuarioValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(usuarioExiste),
    validarCampos,
    deleteFileOnError

] 

export const updateContraseñaValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(usuarioExiste),
    body("nuevaContraseña").isLength({min: 8}).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError

] 

export const updateUsuarioValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(usuarioExiste),
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("apellido").not().isEmpty().withMessage("Apellido obligatorio"),
    body("nombreUsuario").not().isEmpty().withMessage("Nombre de usuario obligatorio"),
    body("email").not().isEmpty().withMessage("Email obligatorio"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("nombreUsuario").custom(nombreUsuarioExists),
    validarCampos,
    deleteFileOnError

]
