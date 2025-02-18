import { hash } from "argon2";
import Usuario from "./usuario.model.js";

export const getUsuarioById = async (req, res) => {
    try{
        const {uid} = req.params;
        const usuario = await Usuario.findById(uid)
        
        if(!usuario){
            return res.status(404).json({
                success: false,
                message: "No existe el usuario",
            })
        }

        return res.status(200).json({
            success: true,
            usuario
        })

    }catch(err){ 
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err 
        })
    }
}

export const getUsuarios = async (req, res) => {
    try{
        const{limite = 10, desde = 0} = req.query
        const query = { status: true }

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
            .limit(limite)
            .skip(desde)
        ])

        return res.status(200).json({  
            success: true,
            total,
            usuarios
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message  
        })
    }
}

export const deleteUsuario = async (req, res) => {
    try{
        const {uid} = req.params
        const usuario = await Usuario.findOneAndDelete(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            usuario
        })

    }catch(err){ 
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updateContraseña = async (req, res) => {
    try {
        const {uid} = req.params
        const {nuevaContraseña} = req.body

        const encryptedPassword = await hash(nuevaContraseña)

        await Usuario.findByIdAndUpdate(uid, {contraseña: encryptedPassword}, {new: true})

        return res.status(200).json({   
            success: true,
            message: "Contraseña actualizada",
        })
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: "Error al actualizar la contraseña",
            error: err.message
        })
    }

}

export const updateUsuario = async (req, res) => {
    try {
        const {uid} = req.params
        const {nombre, apellido, nombreUsuario, email} = req.body
        const usuario = await Usuario.findByIdAndUpdate(uid, {nombre, apellido, nombreUsuario, email}, {new: true})

        return res.status(200).json({   
            success: true,
            message: "Usuario actualizado",
            usuario
        })
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: "Error al actualizar el usuario",
            error: err.message
        })
    }

}