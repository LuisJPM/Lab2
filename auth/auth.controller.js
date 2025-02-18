import { hash, verify } from "argon2";
import Usuario from "../usuario/usuario.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const registro = async (req, res) => {
  try {
    const { nombre, email, nombreUsuario, contraseña } = req.body;

    const hashedPassword = await hash(contraseña);

    const usuario = await Usuario.create({
      nombre,
      email,
      nombreUsuario,
      contraseña: hashedPassword,
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuario: {
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al registrar usuario",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, nombreUsuario, contraseña } = req.body;

    const usuario = await Usuario.findOne({
      $or: [{ email }, { nombreUsuario }],
    });

    if (!usuario) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
        error: "Usuario o correo electrónico no encontrado",
      });
    }

    const isPasswordValid = await verify(usuario.contraseña, contraseña);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Credenciales incorrectas",
        error: "Contraseña incorrecta",
      });
    }

    const token = await generateJWT(usuario.id);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      usuario: {
        uid: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error en el servidor durante el login",
      error: err.message,
    });
  }
};
