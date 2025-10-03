package com.example.Trinity0.Movements

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class MovementsService {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    // Obtener todos los movimientos
    fun obtenerMovimientos(): List<Movements> {
        val sql = "SELECT * FROM movements"
        return jdbcTemplate.query(sql) { rs, _ ->
            Movements(
                id = rs.getInt("id"),
                product_id = rs.getInt("product_id"),
                type = rs.getString("type"),
                qty = rs.getInt("qty"),
                date = rs.getTimestamp("date").toLocalDateTime(),
                note = rs.getString("note"),
                responsible = rs.getString("responsible")
            )
        }
    }

    // Obtener movimiento por ID
    fun obtenerMovimientoPorId(id: Int): Movements? {
        val sql = "SELECT * FROM movements WHERE id = ?"
        return jdbcTemplate.query(sql, arrayOf(id)) { rs, _ ->
            Movements(
                id = rs.getInt("id"),
                product_id = rs.getInt("product_id"),
                type = rs.getString("type"),
                qty = rs.getInt("qty"),
                date = rs.getTimestamp("date").toLocalDateTime(),
                note = rs.getString("note"),
                responsible = rs.getString("responsible")
            )
        }.firstOrNull()
    }

    // Obtener movimientos por producto
    fun obtenerMovimientosPorProducto(productId: Int): List<Movements> {
        val sql = "SELECT * FROM movements WHERE product_id = ? ORDER BY date DESC"
        return jdbcTemplate.query(sql, arrayOf(productId)) { rs, _ ->
            Movements(
                id = rs.getInt("id"),
                product_id = rs.getInt("product_id"),
                type = rs.getString("type"),
                qty = rs.getInt("qty"),
                date = rs.getTimestamp("date").toLocalDateTime(),
                note = rs.getString("note"),
                responsible = rs.getString("responsible")
            )
        }
    }

    // Crear nuevo movimiento
    fun crearMovimiento(movements: Movements): Int {
        val sql = """
            INSERT INTO movements (product_id, type, qty, date, note, responsible) 
            VALUES (?, ?, ?, ?, ?, ?)
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            movements.product_id,
            movements.type,
            movements.qty,
            movements.date,
            movements.note,
            movements.responsible
        )
    }

    // Actualizar movimiento existente
    fun actualizarMovimiento(id: Int, movements: Movements): Int {
        val sql = """
            UPDATE movements SET 
                product_id = ?, type = ?, qty = ?, date = ?, note = ?, responsible = ?
            WHERE id = ?
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            movements.product_id,
            movements.type,
            movements.qty,
            movements.date,
            movements.note,
            movements.responsible,
            id
        )
    }

    // Eliminar movimiento
    fun eliminarMovimiento(id: Int): Int {
        val sql = "DELETE FROM movements WHERE id = ?"
        return jdbcTemplate.update(sql, id)
    }

    // Método especial: Crear movimiento con fecha actual automática
    fun crearMovimientoConFechaActual(movements: Movements): Int {
        val sql = """
            INSERT INTO movements (product_id, type, qty, date, note, responsible) 
            VALUES (?, ?, ?, NOW(), ?, ?)
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            movements.product_id,
            movements.type,
            movements.qty,
            movements.note,
            movements.responsible
        )
    }
}