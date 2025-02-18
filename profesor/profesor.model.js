import { Schema, model} from "mongoose";

const profesorSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no debe exceder de los 25 caracteres"]
    },
    apellido:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "El nombre no debe exceder de los 25 caracteres"]
    },
    nombreUsuario:{
        type: String,
        required: true,
        unique:true
    },
    email:{
        type: String,
        required: [true, "Email es requerido"],
        unique: true
    },
    contraseña:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    curso:{
        type: String,
        required: [true, "El curso es requerido"],
        maxLength: [25, "El curso no debe exceder de los 25 caracteres"]
    },
    status:{
        type: Boolean,
        default: true
    }, 
},
{
    versionKey: false,
    timeStamps: true
})

profesorSchema.methods.toJSON = function(){
    const {__v, contraseña, _id, ...profesor} = this.toObject()
    profesor.uid = _id
    return profesor
}

export default model("Profesor", profesorSchema)