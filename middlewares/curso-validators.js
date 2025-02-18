import {body, check} from "express-validator";
import {nombrecursoExists, cursoExiste} from "../helpers/db-validators.js";
import {validarCampos} from "./validar-campos.js"
import {deleteFileOnError} from "./delete-file-on-error.js" 

export const createCursoValidator = [
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("descripcion").not().isEmpty().withMessage("Descripcion obligatoria"),
    body("nombre").custom(nombrecursoExists),
    validarCampos
]

export const getCursoByIdValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(cursoExiste),
    validarCampos,
    deleteFileOnError
]

export const deleteCursoValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(cursoExiste),
    validarCampos,
    deleteFileOnError
]

export const updateCursoValidator = [
    check("uid").isMongoId().withMessage("No es un id valido"),
    check("uid").custom(cursoExiste),
    body("nombre").not().isEmpty().withMessage("Nombre obligatorio"),
    body("descripcion").not().isEmpty().withMessage("Descripcion obligatoria"),
    validarCampos,
    deleteFileOnError
]
