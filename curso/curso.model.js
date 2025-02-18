import { Schema, model } from "mongoose";

const cursoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      maxLength: [25, "El nombre no debe exceder los 25 caracteres"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción del curso es requerida"],
      maxLength: [130, "La descripción no debe exceder los 130 caracteres"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);


cursoSchema.methods.toJSON = function () {
  const { __v, _id, ...curso } = this.toObject();
  curso.uid = _id; 
  return curso;
};

export default model("Curso", cursoSchema);
