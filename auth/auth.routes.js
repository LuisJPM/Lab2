import { Router } from "express";
import { registro, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/validators.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";

const router = Router();

router.post("/registro", registerValidator, deleteFileOnError, registro);
router.post("/login", loginValidator, login);

export default router;
