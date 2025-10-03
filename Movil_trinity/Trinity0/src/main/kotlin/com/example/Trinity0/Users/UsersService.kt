package com.example.Trinity0.Users

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service

@Service
class UsersService {

    @Autowired
    lateinit var jdbcTemplate: JdbcTemplate

    // Obtener todos los usuarios
    fun obtenerUsuarios(): List<Users> {
        val sql = "SELECT * FROM users"
        return jdbcTemplate.query(sql) { rs, _ ->
            Users(
                id = rs.getInt("id"),
                email = rs.getString("email"),
                password = rs.getString("password"),
                nombre = rs.getString("nombre"),
                rol = rs.getString("rol")
            )
        }
    }

    // Obtener usuario por ID
    fun obtenerUsuarioPorId(id: Int): Users? {
        val sql = "SELECT * FROM users WHERE id = ?"
        return jdbcTemplate.query(sql, arrayOf(id)) { rs, _ ->
            Users(
                id = rs.getInt("id"),
                email = rs.getString("email"),
                password = rs.getString("password"),
                nombre = rs.getString("nombre"),
                rol = rs.getString("rol")
            )
        }.firstOrNull()
    }

    // Obtener usuario por email
    fun obtenerUsuarioPorEmail(email: String): Users? {
        val sql = "SELECT * FROM users WHERE email = ?"
        return jdbcTemplate.query(sql, arrayOf(email)) { rs, _ ->
            Users(
                id = rs.getInt("id"),
                email = rs.getString("email"),
                password = rs.getString("password"),
                nombre = rs.getString("nombre"),
                rol = rs.getString("rol")
            )
        }.firstOrNull()
    }

    // Obtener usuarios por rol
    fun obtenerUsuariosPorRol(rol: String): List<Users> {
        val sql = "SELECT * FROM users WHERE rol = ?"
        return jdbcTemplate.query(sql, arrayOf(rol)) { rs, _ ->
            Users(
                id = rs.getInt("id"),
                email = rs.getString("email"),
                password = rs.getString("password"),
                nombre = rs.getString("nombre"),
                rol = rs.getString("rol")
            )
        }
    }

    // Crear nuevo usuario
    fun crearUsuario(users: Users): Int {
        val sql = """
            INSERT INTO users (email, password, nombre, rol) 
            VALUES (?, ?, ?, ?)
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            users.email,
            users.password,
            users.nombre,
            users.rol
        )
    }

    // Actualizar usuario existente
    fun actualizarUsuario(id: Int, users: Users): Int {
        val sql = """
            UPDATE users SET 
                email = ?, password = ?, nombre = ?, rol = ?
            WHERE id = ?
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            users.email,
            users.password,
            users.nombre,
            users.rol,
            id
        )
    }

    // Actualizar solo el perfil (sin contraseña)
    fun actualizarPerfil(id: Int, email: String, nombre: String, rol: String): Int {
        val sql = """
            UPDATE users SET 
                email = ?, nombre = ?, rol = ?
            WHERE id = ?
        """.trimIndent()

        return jdbcTemplate.update(
            sql,
            email,
            nombre,
            rol,
            id
        )
    }

    // Actualizar contraseña
    fun actualizarPassword(id: Int, nuevaPassword: String): Int {
        val sql = "UPDATE users SET password = ? WHERE id = ?"
        return jdbcTemplate.update(sql, nuevaPassword, id)
    }

    // Eliminar usuario
    fun eliminarUsuario(id: Int): Int {
        val sql = "DELETE FROM users WHERE id = ?"
        return jdbcTemplate.update(sql, id)
    }

    // Verificar credenciales (login)
    fun verificarCredenciales(email: String, password: String): Users? {
        val sql = "SELECT * FROM users WHERE email = ? AND password = ?"
        return jdbcTemplate.query(sql, arrayOf(email, password)) { rs, _ ->
            Users(
                id = rs.getInt("id"),
                email = rs.getString("email"),
                password = rs.getString("password"),
                nombre = rs.getString("nombre"),
                rol = rs.getString("rol")
            )
        }.firstOrNull()
    }

    // Verificar si email existe
    fun existeEmail(email: String): Boolean {
        val sql = "SELECT COUNT(*) FROM users WHERE email = ?"
        val count = jdbcTemplate.queryForObject(sql, Int::class.java, email)
        return count != null && count > 0
    }
}