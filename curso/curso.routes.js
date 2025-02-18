import { Router } from "express"
import { registroCurso, getCursoById, getCursos, updateCurso, deleteCurso } from "./curso.controller.js"
import { createCursoValidator, getCursoByIdValidator, deleteCursoValidator, updateCursoValidator } from "../middlewares/curso-validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"
const router = Router()

router.post("/registroCurso", createCursoValidator, deleteFileOnError,registroCurso)

router.get("/findCurso/:uid", getCursoByIdValidator, getCursoById)

router.get("/", getCursos)

router.delete("/deleteCurso/:uid", deleteCursoValidator, deleteCurso)

router.patch("/actualizarCurso/:uid", updateCursoValidator, updateCurso)


export default router