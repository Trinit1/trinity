// routes/movements.routes.js - CRUD COMPLETO
const express = require('express');
const router = express.Router();
const db = require('../models');

// ==================== GET: Obtener todos los movimientos ====================
router.get('/', async (req, res) => {
  console.log('📝 GET /api/movements solicitado');
  
  try {
    // CONSULTA SIMPLE - sin include por ahora
    const movimientos = await db.Movements.findAll({
      order: [['fecha', 'DESC'], ['hora', 'DESC']],
      limit: 100
    });
    
    console.log(`✅ Encontrados ${movimientos.length} movimientos`);
    
    // Formatear respuesta básica
    const resultado = movimientos.map(mov => ({
      id: mov.id,
      tipo_movimiento: mov.tipo_movimiento,
      producto: mov.producto_nombre || 'Sin nombre',
      cantidad: mov.cantidad,
      fecha: mov.fecha,
      hora: mov.hora,
      nota: mov.nota || '',
      responsable: mov.responsable,
      createdAt: mov.createdAt,
      updatedAt: mov.updatedAt
    }));
    
    res.json(resultado);
    
  } catch (error) {
    console.error('❌ Error en GET /api/movements:', error);
    res.status(500).json({
      mensaje: 'Error al obtener los movimientos',
      error: error.message,
      sql: error.sql || 'No SQL disponible'
    });
  }
});

// ==================== POST: Crear nuevo movimiento ====================
router.post('/', async (req, res) => {
  console.log('📝 POST /api/movements - Datos:', req.body);
  
  const { tipo_movimiento, producto_nombre, cantidad, fecha, hora, nota, responsable } = req.body;
  
  // Validación
  if (!tipo_movimiento || !producto_nombre || !cantidad || !fecha || !hora || !responsable) {
    return res.status(400).json({
      mensaje: 'Faltan campos requeridos',
      campos_requeridos: ['tipo_movimiento', 'producto_nombre', 'cantidad', 'fecha', 'hora', 'responsable']
    });
  }

  try {
    const nuevoMovimiento = await db.Movements.create({
      tipo_movimiento,
      producto_nombre,
      cantidad: parseInt(cantidad),
      fecha,
      hora,
      nota: nota || '',
      responsable
    });
    
    console.log(`✅ Movimiento creado con ID: ${nuevoMovimiento.id}`);
    
    res.status(201).json({
      mensaje: 'Movimiento registrado exitosamente',
      movimiento: {
        id: nuevoMovimiento.id,
        tipo_movimiento: nuevoMovimiento.tipo_movimiento,
        producto: nuevoMovimiento.producto_nombre,
        cantidad: nuevoMovimiento.cantidad,
        fecha: nuevoMovimiento.fecha,
        hora: nuevoMovimiento.hora,
        nota: nuevoMovimiento.nota,
        responsable: nuevoMovimiento.responsable,
        createdAt: nuevoMovimiento.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Error en POST /api/movements:', error);
    res.status(500).json({
      mensaje: 'Error al guardar el movimiento',
      error: error.message,
      detalles: error.errors ? error.errors.map(e => e.message) : null
    });
  }
});

// ==================== PUT: Actualizar movimiento ====================
router.put('/:id', async (req, res) => {
  console.log(`📝 PUT /api/movements/${req.params.id}`, req.body);
  
  const { id } = req.params;
  const { tipo_movimiento, producto_nombre, cantidad, fecha, hora, nota, responsable } = req.body;

  try {
    // 1. Buscar el movimiento
    const movimiento = await db.Movements.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({
        mensaje: `Movimiento con ID ${id} no encontrado`,
        id: id
      });
    }

    // 2. Validar que haya al menos un campo para actualizar
    const camposParaActualizar = { tipo_movimiento, producto_nombre, cantidad, fecha, hora, nota, responsable };
    const hayCamposValidos = Object.values(camposParaActualizar).some(val => val !== undefined);
    
    if (!hayCamposValidos) {
      return res.status(400).json({
        mensaje: 'Debe enviar al menos un campo para actualizar',
        campos_permitidos: ['tipo_movimiento', 'producto_nombre', 'cantidad', 'fecha', 'hora', 'nota', 'responsable']
      });
    }

    // 3. Actualizar campos (solo los enviados)
    if (tipo_movimiento !== undefined) movimiento.tipo_movimiento = tipo_movimiento;
    if (producto_nombre !== undefined) movimiento.producto_nombre = producto_nombre;
    if (cantidad !== undefined) movimiento.cantidad = parseInt(cantidad);
    if (fecha !== undefined) movimiento.fecha = fecha;
    if (hora !== undefined) movimiento.hora = hora;
    if (nota !== undefined) movimiento.nota = nota;
    if (responsable !== undefined) movimiento.responsable = responsable;

    // 4. Guardar cambios
    await movimiento.save();
    
    console.log(`✅ Movimiento ${id} actualizado correctamente`);

    // 5. Retornar respuesta
    res.json({
      mensaje: 'Movimiento actualizado correctamente',
      movimiento: {
        id: movimiento.id,
        tipo_movimiento: movimiento.tipo_movimiento,
        producto: movimiento.producto_nombre,
        cantidad: movimiento.cantidad,
        fecha: movimiento.fecha,
        hora: movimiento.hora,
        nota: movimiento.nota,
        responsable: movimiento.responsable,
        updatedAt: movimiento.updatedAt
      }
    });
  } catch (error) {
    console.error(`❌ Error en PUT /api/movements/${id}:`, error);
    res.status(500).json({
      mensaje: 'Error al actualizar el movimiento',
      error: error.message
    });
  }
});

// ==================== DELETE: Eliminar movimiento ====================
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📝 DELETE /api/movements/${id} solicitado`);
  
  try {
    // 1. Buscar el movimiento
    const movimiento = await db.Movements.findByPk(id);
    if (!movimiento) {
      return res.status(404).json({
        mensaje: `Movimiento con ID ${id} no encontrado`,
        id: id
      });
    }

    // 2. Guardar información antes de eliminar (para respuesta)
    const movimientoInfo = {
      id: movimiento.id,
      producto: movimiento.producto_nombre,
      tipo: movimiento.tipo_movimiento,
      cantidad: movimiento.cantidad,
      responsable: movimiento.responsable
    };

    // 3. Eliminar
    await movimiento.destroy();
    
    console.log(`🗑️ Movimiento ${id} eliminado: ${movimiento.producto_nombre}`);

    // 4. Retornar respuesta
    res.json({
      mensaje: 'Movimiento eliminado correctamente',
      movimiento: movimientoInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`❌ Error en DELETE /api/movements/${id}:`, error);
    res.status(500).json({
      mensaje: 'Error al eliminar el movimiento',
      error: error.message
    });
  }
});

// ==================== GET por ID: Obtener un movimiento específico ====================
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📝 GET /api/movements/${id} solicitado`);
  
  try {
    const movimiento = await db.Movements.findByPk(id);
    
    if (!movimiento) {
      return res.status(404).json({
        mensaje: `Movimiento con ID ${id} no encontrado`
      });
    }
    
    res.json({
      id: movimiento.id,
      tipo_movimiento: movimiento.tipo_movimiento,
      producto: movimiento.producto_nombre,
      cantidad: movimiento.cantidad,
      fecha: movimiento.fecha,
      hora: movimiento.hora,
      nota: movimiento.nota,
      responsable: movimiento.responsable,
      createdAt: movimiento.createdAt,
      updatedAt: movimiento.updatedAt
    });
  } catch (error) {
    console.error(`❌ Error en GET /api/movements/${id}:`, error);
    res.status(500).json({
      mensaje: 'Error al obtener el movimiento',
      error: error.message
    });
  }
});

// Exportar router
module.exports = router;