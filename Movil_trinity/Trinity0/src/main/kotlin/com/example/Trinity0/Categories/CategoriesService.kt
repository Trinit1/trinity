package com.example.Trinity0.Categories

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class CategoriesService {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate


    fun obtenerCategorias(): List<Categories> {
        val sql = "SELECT * FROM categories"
        return jdbcTemplate.query(sql) { rs, _ ->
            Categories(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                description = rs.getString("description"),
                stock_minimo = rs.getInt("stock_minimo")
            )
        }
    }


    fun obtenerCategoriaPorId(id: Int): Categories? {
        val sql = "SELECT * FROM categories WHERE id = ?"
        return jdbcTemplate.query(sql, arrayOf(id)) { rs, _ ->
            Categories(
                id = rs.getInt("id"),
                name = rs.getString("name"),
                description = rs.getString("description"),
                stock_minimo = rs.getInt("stock_minimo")
            )
        }.firstOrNull()
    }

    fun crearCategoria(categories: Categories): Int {
        val sql = """
        INSERT INTO categories (name, description, stock_minimo, createdAt, updatedAt) 
        VALUES (?, ?, ?, NOW(), NOW())
    """.trimIndent()

        return jdbcTemplate.update(
            sql,
            categories.name,
            categories.description,
            categories.stock_minimo
        )
    }


    fun actualizarCategoria(id: Int, categories: Categories): Int {
        val sql = """
            UPDATE categories SET 
                name = ?, description = ?, stock_minimo = ?
            WHERE id = ?
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            categories.name,
            categories.description,
            categories.stock_minimo,
            id
        )
    }


    fun eliminarCategoria(id: Int): Int {
        val sql = "DELETE FROM categories WHERE id = ?"
        return jdbcTemplate.update(sql, id)
    }
}