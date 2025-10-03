package com.example.Trinity0.Products

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class ProductsService {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    // Obtener todos los productos
    fun obtenerProductos(): List<Products> {
        val sql = "SELECT * FROM products"
        return jdbcTemplate.query(sql) { rs, _ ->
            Products(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                quantity = rs.getInt("quantity"),
                category_id = rs.getInt("category_id"),
                imageUrl = rs.getString("imageUrl"),
                vendidos = rs.getInt("vendidos"),
            )
        }
    }

    // Obtener producto por ID
    fun obtenerProductoPorId(id: Int): Products? {
        val sql = "SELECT * FROM products WHERE id = ?"
        return jdbcTemplate.query(sql, arrayOf(id)) { rs, _ ->
            Products(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                quantity = rs.getInt("quantity"),
                category_id = rs.getInt("category_id"),
                imageUrl = rs.getString("imageUrl"),
                vendidos = rs.getInt("vendidos")
            )
        }.firstOrNull()
    }

    // Obtener productos por categoría
    fun obtenerProductosPorCategoria(categoryId: Int): List<Products> {
        val sql = "SELECT * FROM products WHERE category_id = ?"
        return jdbcTemplate.query(sql, arrayOf(categoryId)) { rs, _ ->
            Products(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                quantity = rs.getInt("quantity"),
                category_id = rs.getInt("category_id"),
                imageUrl = rs.getString("imageUrl"),
                vendidos = rs.getInt("vendidos")
            )
        }
    }

    // Crear nuevo producto
    fun crearProducto(products: Products): Int {
        val sql = """
            INSERT INTO products (name, quantity, category_id, imageUrl, vendidos) 
            VALUES (?, ?, ?, ?, ?)
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            products.name,
            products.quantity,
            products.category_id,
            products.vendidos
        )
    }

    // Actualizar producto existente
    fun actualizarProducto(id: Int, products: Products): Int {
        val sql = """
            UPDATE products SET 
                name = ?, quantity = ?, category_id = ?, imageUrl = ?, vendidos = ?
            WHERE id = ?
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            products.name,
            products.quantity,
            products.category_id,
            products.imageUrl,
            products.vendidos,
            id
        )
    }

    // Eliminar producto
    fun eliminarProducto(id: Int): Int {
        val sql = "DELETE FROM products WHERE id = ?"
        return jdbcTemplate.update(sql, id)
    }

    // Actualizar cantidad de producto (para movimientos de stock)
    fun actualizarCantidad(id: Int, nuevaCantidad: Int): Int {
        val sql = "UPDATE products SET quantity = ? WHERE id = ?"
        return jdbcTemplate.update(sql, nuevaCantidad, id)
    }

    // Incrementar vendidos (cuando se vende un producto)
    fun incrementarVendidos(id: Int, cantidad: Int): Int {
        val sql = "UPDATE products SET vendidos = vendidos + ? WHERE id = ?"
        return jdbcTemplate.update(sql, cantidad, id)
    }

    // Buscar productos por nombre
    fun buscarProductosPorNombre(nombre: String): List<Products> {
        val sql = "SELECT * FROM products WHERE name LIKE ?"
        return jdbcTemplate.query(sql, arrayOf("%$nombre%")) { rs, _ ->
            Products(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                quantity = rs.getInt("quantity"),
                category_id = rs.getInt("category_id"),
                imageUrl = rs.getString("imageUrl"),
                vendidos = rs.getInt("vendidos")
            )
        }
    }
}