const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const usuarios = await db.User.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      mensaje: 'Error interno del servidor' 
    });
  }
});

router.post('/', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  
  // Validaciones básicas
  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ 
      mensaje: 'Todos los campos son requeridos' 
    });
  }

  try {
    // Verificar si el email ya existe
    const usuarioExistente = await db.User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }
    
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear el usuario
    const nuevoUsuario = await db.User.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });
    
    // Retornar respuesta sin la contraseña
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        createdAt: nuevoUsuario.createdAt
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ 
      mensaje: 'Error interno del servidor',
      error: error.message 
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    const usuario = await db.User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    if (nombre) usuario.nombre = nombre;
    if (email) usuario.email = email;
    if (rol) usuario.rol = rol;

    await usuario.save();

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        updatedAt: usuario.updatedAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno al actualizar el usuario' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await db.User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    await usuario.destroy();

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno al eliminar el usuario' });
  }
});

module.exports = router;

