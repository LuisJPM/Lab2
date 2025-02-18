import { Schema, model} from "mongoose";

const usuarioSchema = Schema({
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
    contraseña: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8
    },
    role:{
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
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

usuarioSchema.methods.toJSON = function(){
    const {__v, contraseña, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("Usuario", usuarioSchema)