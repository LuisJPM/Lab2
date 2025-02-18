import Profesor from "./profesor.model.js"

export const registroProfesor = async (req, res) => {
    try{
        const data = req.body
        const profesor = await Profesor.create(data)
        return res.status(201).json({
            message: "Profesor registrado",
            nombre: profesor.nombre,
            apellido: profesor.apellido,
            nombreUsuario: profesor.nombreUsuario,
            email: profesor.email,
            curso: profesor.curso,
        })
    }catch(err){
        return res.status(500).json({
            message: "Profesor no registrado",
            success: err.message
        })
    }
}

export const getProfesorById = async (req, res) => {
    try{
        const {uid} = req.params
        const profesor = await Profesor.findById(uid)
        
        if(!profesor){
            return res.status(404).json({
                success: false,
                message: "No existe el profesor",
            })
        }

        return res.status(200).json({
            success: true,
            profesor
        })

    }catch(err){ 
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err 
        })
    }
}

export const getProfesores = async (req, res) => {
    try{
        const{limite = 10, desde = 0} = req.query
        const query = { status: true }

        const [total, profesores] = await Promise.all([
            Profesor.countDocuments(query),
            Profesor.find(query)
            .limit(limite)
            .skip(desde)
        ])

        return res.status(200).json({  
            success: true,
            total,
            profesores
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los profesores",
            error: err.message  
        })
    }
}

export const deleteProfesor = async (req, res) => {
    try{
        const {uid} = req.params
        const profesor = await Profesor.findOneAndDelete(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            profesor
        })

    }catch(err){ 
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        })
    }
}

export const updateProfesor = async (req, res) => {
    try {
        const {uid} = req.params
        const {nombre, apellido, nombreUsuario, email, curso} = req.body
        const profesor = await Profesor.findByIdAndUpdate(uid, {nombre, apellido, nombreUsuario, email, curso}, {new: true})

        return res.status(200).json({   
            success: true,
            message: "Profesor actualizado",
            profesor
        })
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: "Error al actualizar el profesor",
            error: err.message
        })
    }

}