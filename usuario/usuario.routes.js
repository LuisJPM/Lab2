import { Router } from "express"
import { getUsuarioById, getUsuarios, deleteUsuario, updateContraseña, updateUsuario } from "./usuario.controller.js"
import { getUsuarioByIdValidator, deleteUsuarioValidator, updateContraseñaValidator, updateUsuarioValidator } from "../middlewares/validators.js"

const router = Router()

router.get("/findUser/:uid", getUsuarioByIdValidator, getUsuarioById)

router.get("/", getUsuarios)

router.delete("/deleteUsuario/:uid", deleteUsuarioValidator, deleteUsuario)

router.patch("/actualizarContrasena/:uid", updateContraseñaValidator, updateContraseña)

router.patch("/actualizarUsuario/:uid", updateUsuarioValidator, updateUsuario)
export default router