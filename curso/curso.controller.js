import Curso from "./curso.model.js";

export const registroCurso = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const curso = await Curso.create({ nombre, descripcion });

    return res.status(201).json({
      success: true,
      message: "Curso registrado exitosamente",
      curso: {
        nombre: curso.nombre,
        descripcion: curso.descripcion,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al registrar el curso",
      error: err.message,
    });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { uid } = req.params;
    const curso = await Curso.findById(uid).lean();

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      curso,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener el curso",
      error: err.message,
    });
  }
};

export const getCursos = async (req, res) => {
  try {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    const [total, cursos] = await Promise.all([
      Curso.countDocuments(query),
      Curso.find(query).limit(Number(limite)).skip(Number(desde)),
    ]);

    return res.status(200).json({
      success: true,
      total,
      cursos,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener los cursos",
      error: err.message,
    });
  }
};

export const deleteCurso = async (req, res) => {
  try {
    const { uid } = req.params;
    const curso = await Curso.findByIdAndDelete(uid);

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Curso eliminado exitosamente",
      curso,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al eliminar el curso",
      error: err.message,
    });
  }
};

export const updateCurso = async (req, res) => {
  try {
    const { uid } = req.params;
    const { nombre, descripcion } = req.body;

    const curso = await Curso.findByIdAndUpdate(
      uid,
      { nombre, descripcion },
      { new: true, runValidators: true }
    );

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Curso actualizado exitosamente",
      curso,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al actualizar el curso",
      error: err.message,
    });
  }
};
