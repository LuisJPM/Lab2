"use strict"

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import usuarioRoutes from "../src/usuario/usuario.routes.js";
import cursoRoutes from "../src/curso/curso.routes.js";
import profesorRoutes from "../src/profesor/profesor.routes.js";
import alumnosRoutes from "../src/alumno/alumno.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/academicSystem/v1/auth", authRoutes)
    app.use("/academicSystem/v1/usuario", usuarioRoutes)
    app.use("/academicSystem/v1/curso", cursoRoutes)
    app.use("/academicSystem/v1/profesor", profesorRoutes)
    app.use("/academicSystem/v1/alumno", alumnosRoutes)

}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}
