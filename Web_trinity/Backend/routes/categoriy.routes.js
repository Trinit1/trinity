const express = require('express');
const router = express.Router();
const db = require('../models');
const upload = require('../middlewares/upload');
const path = require('path');

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         imageUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       500:
 *         description: Error al obtener las categorías
 */
router.get('/', async (req, res) => {
  try {
    const categorias = await db.Category.findAll();
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
});

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: El nombre es obligatorio
 *       500:
 *         description: Error al crear la categoría
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || name.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    const nuevaCategoria = await db.Category.create({
      name: name.trim(),
      description: description || null,
      imageUrl
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
});

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: El nombre es obligatorio
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al actualizar la categoría
 */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name || name.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
    }

    const categoria = await db.Category.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : categoria.imageUrl;

    await categoria.update({
      name: name.trim(),
      description: description ?? categoria.description,
      imageUrl
    });

    res.json({ mensaje: 'Categoría actualizada correctamente', categoria });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
});

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       400:
 *         description: No se puede eliminar porque tiene productos asociados
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error al eliminar la categoría
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await db.Category.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    const productosAsociados = await db.Product.count({ where: { category_id: id } });
    if (productosAsociados > 0) {
      return res.status(400).json({
        mensaje: 'No se puede eliminar la categoría porque tiene productos asociados',
      });
    }

    await categoria.destroy();
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
});

/**
 * @swagger
 * /api/categorias/resumen:
 *   get:
 *     summary: Obtener resumen de stock por categoría
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Resumen de productos por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   resumen:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         categoria:
 *                           type: string
 *                         imageUrl:
 *                           type: string
 *                         total:
 *                           type: integer
 *                   total_productos:
 *                     type: integer
 *                   ultima_actualizacion:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener el resumen
 */
router.get('/resumen', async (req, res) => {
  try {
    const resumen = await db.sequelize.query(`
      SELECT c.id, c.name AS categoria, c.imageUrl, COUNT(p.id) AS total
      FROM Categories c
      LEFT JOIN Products p ON c.id = p.category_id
      GROUP BY c.id, c.name, c.imageUrl
      ORDER BY c.name ASC;
    `, { type: db.sequelize.QueryTypes.SELECT });

    const total_productos = resumen.reduce((acc, item) => acc + parseInt(item.total), 0);
    const ultimaActualizacion = await db.Product.max('updatedAt');

    res.json([{
      resumen,
      total_productos,
      ultima_actualizacion: ultimaActualizacion || null
    }]);
  } catch (error) {
    console.error('Error al generar resumen:', error);
    res.status(500).json({ mensaje: 'Error al obtener el resumen de categorías' });
  }
});

module.exports = router;