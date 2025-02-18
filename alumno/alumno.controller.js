import Alumno from "./alumno.model.js";

export const registroAlumno = async (req, res) => {
    try {
        const data = req.body;
        const alumno = await Alumno.create(data);
        
        return res.status(201).json({
            message: "Alumno registrado",
            nombre: alumno.nombre,
            apellido: alumno.apellido,
            nombreUsuario: alumno.nombreUsuario,
            email: alumno.email,
            curso: alumno.curso,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Alumno no registrado",
            success: false,
            error: err.message
        });
    }
};

export const getAlumnoById = async (req, res) => {
    try {
        const { uid } = req.params;
        const alumno = await Alumno.findById(uid);
        
        if (!alumno) {
            return res.status(404).json({
                success: false,
                message: "No existe el alumno",
            });
        }

        return res.status(200).json({
            success: true,
            alumno
        });
    } catch (err) { 
        return res.status(500).json({
            success: false,
            message: "Error al obtener el alumno",
            error: err.message
        });
    }
};

export const getAlumnos = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { status: true };

        const [total, alumnos] = await Promise.all([
            Alumno.countDocuments(query),
            Alumno.find(query)
                .limit(Number(limite))
                .skip(Number(desde))
        ]);

        return res.status(200).json({  
            success: true,
            total,
            alumnos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los alumnos",
            error: err.message  
        });
    }
};

export const deleteAlumno = async (req, res) => {
    try {
        const { uid } = req.params;
        const alumno = await Alumno.findOneAndDelete({ _id: uid });

        if (!alumno) {
            return res.status(404).json({
                success: false,
                message: "Alumno no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Alumno eliminado",
            alumno
        });
    } catch (err) { 
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el alumno",
            error: err.message
        });
    }
};

export const updateAlumno = async (req, res) => {
    try {
        const { uid } = req.params;
        const { nombre, apellido, nombreUsuario, email, curso } = req.body;

        const alumno = await Alumno.findByIdAndUpdate(
            uid, 
            { nombre, apellido, nombreUsuario, email, curso }, 
            { new: true }
        );

        if (!alumno) {
            return res.status(404).json({
                success: false,
                message: "Alumno no encontrado"
            });
        }

        return res.status(200).json({   
            success: true,
            message: "Alumno actualizado",
            alumno
        });
    } catch (err) {
        return res.status(500).json({
            success: false, 
            message: "Error al actualizar el alumno",
            error: err.message
        });
    }
};
