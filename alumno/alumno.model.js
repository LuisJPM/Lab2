import mongoose from "mongoose";

const { Schema, model } = mongoose;

const alumnoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      maxLength: [25, "El nombre no puede superar los 25 caracteres"]
    },
    apellido: {
      type: String,
      required: [true, "El apellido es obligatorio"],
      maxLength: [25, "El apellido no puede superar los 25 caracteres"]
    },
    nombreUsuario: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true
    },
    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"]
    },
    curso: {
      type: String,
      required: [true, "El curso es obligatorio"],
      maxLength: [25, "El curso no puede superar los 25 caracteres"]
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

alumnoSchema.methods.toJSON = function () {
  const alumno = this.toObject();
  const { __v, contraseña, _id, ...resto } = alumno;
  return { uid: _id, ...resto };
};

export default model("Alumno", alumnoSchema);
