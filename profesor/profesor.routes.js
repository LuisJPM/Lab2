import { Router } from "express"
import { registroProfesor, getProfesorById, getProfesores, deleteProfesor, updateProfesor } from "./profesor.controller.js"
import { registroProfesorValidator, getProfesorByIdValidator, deleteProfesorValidator, updateProfesorValidator } from "../middlewares/profesor-validators.js"
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js"
const router = Router()

router.post("/registroProfesor", registroProfesorValidator, deleteFileOnError, registroProfesor)

router.get("/findProfesor/:uid", getProfesorByIdValidator, getProfesorById)

router.get("/", getProfesores)

router.delete("/deleteProfesor/:uid", deleteProfesorValidator, deleteProfesor)

router.patch("/actualizarProfesor/:uid", updateProfesorValidator, updateProfesor)


export default router