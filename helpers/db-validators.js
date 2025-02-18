import Usuario from "../usuario/usuario.model.js";
import Curso from "../curso/curso.model.js";
import Alumno from "../alumno/alumno.model.js";
import Profesor from "../profesor/profesor.model.js";

export const emailExists = async (email = "") => {
    const existe = await Usuario.findOne({email})
    if(existe){
        throw new Error('El email ${email} ya existe')
    }
}

export const nombreUsuarioExists = async (nombreUsuario = "") => {
    const existe = await Usuario.findOne({nombreUsuario})
    if(existe){
        throw new Error('El nombre de usuario ${nombreUsuario} ya existe')
    }

}

export const nombreProfesorExists = async (nombre = "") => {
    const existe = await Profesor.findOne({nombre})
    if(existe){
        throw new Error('El nombre del profesor ${nombre} ya existe')
    }
}


export const nombrecursoExists = async (nombre = "") => {
    const existe = await Curso.findOne({nombre})
    if(existe){
        throw new Error('El nombre del curso ${nombre} ya existe')
    }
}

export const nombreAlumnoExists = async (nombre = "") => {
    const existe = await Alumno.findOne({nombre})
    if(existe){
        throw new Error('El nombre del alumno ${nombre} ya existe')
    }
}

export const usuarioExiste = async (uid = "") => {
    const existe = await Usuario.findById(uid)
    if(!existe){
        throw new Error('No existe el usuario con el id')
    }
}

export const cursoExiste = async (uid = "") => {
    const existe = await Curso.findById(uid)
    if(!existe){
        throw new Error('No existe el curso con el id')
    }
}

export const profesorExiste = async (uid = "") => {
    const existe = await Profesor.findById(uid)
    if(!existe){
        throw new Error('No existe el profesor con el id')
    }
}

export const alumnoExiste = async (uid = "") => {
    const existe = await Alumno.findById(uid)
    if(!existe){
        throw new Error('No existe el alumno con el id')
    }
}
