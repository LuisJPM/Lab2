import { Router } from "express";
import {
  registroAlumno,
  getAlumnoById,
  getAlumnos,
  deleteAlumno,
  updateAlumno,
} from "./alumno.controller.js";
import {
  registroAlumnoValidator,
  getAlumnoByIdValidator,
  deleteAlumnoValidator,
  updateAlumnoValidator,
} from "../middlewares/alumno-validators.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";

const router = Router();

router.post("/registro", registroAlumnoValidator, deleteFileOnError, registroAlumno);

router.get("/", getAlumnos);

router
  .route("/:uid")
  .get(getAlumnoByIdValidator, getAlumnoById) 
  .patch(updateAlumnoValidator, updateAlumno) 
  .delete(deleteAlumnoValidator, deleteAlumno); 

export default router;
