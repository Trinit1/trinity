package com.example.Trinity0.Users

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/users")
class UsersController {

    @Autowired
    lateinit var usersService: UsersService

    // INDEX → GET /api/users
    @GetMapping
    fun obtenerUsuarios(): List<Users> = usersService.obtenerUsuarios()

    // SHOW → GET /api/users/{id}
    @GetMapping("/{id}")
    fun obtenerUsuario(@PathVariable id: Int): Users? =
        usersService.obtenerUsuarioPorId(id)

    // OBTENER POR EMAIL → GET /api/users/email/{email}
    @GetMapping("/email/{email}")
    fun obtenerUsuarioPorEmail(@PathVariable email: String): Users? =
        usersService.obtenerUsuarioPorEmail(email)

    // OBTENER POR ROL → GET /api/users/rol/{rol}
    @GetMapping("/rol/{rol}")
    fun obtenerUsuariosPorRol(@PathVariable rol: String): List<Users> =
        usersService.obtenerUsuariosPorRol(rol)

    // STORE → POST /api/users
    @PostMapping
    fun crearUsuario(@RequestBody users: Users): String {
        // Verificar si el email ya existe
        if (usersService.existeEmail(users.email)) {
            return "Error: El email ya está registrado"
        }

        val filas = usersService.crearUsuario(users)
        return if (filas > 0) "Usuario creado con éxito" else "No se pudo crear usuario"
    }

    // UPDATE → PUT /api/users/{id}
    @PutMapping("/{id}")
    fun actualizarUsuario(@PathVariable id: Int, @RequestBody users: Users): String {
        val filas = usersService.actualizarUsuario(id, users)
        return if (filas > 0) "Usuario actualizado con éxito" else "No se encontró usuario con id $id"
    }

    // ACTUALIZAR PERFIL → PATCH /api/users/{id}/perfil
    @PatchMapping("/{id}/perfil")
    fun actualizarPerfil(@PathVariable id: Int, @RequestBody request: Map<String, String>): String {
        val email = request["email"] ?: return "Campo 'email' requerido"
        val nombre = request["nombre"] ?: return "Campo 'nombre' requerido"
        val rol = request["rol"] ?: return "Campo 'rol' requerido"

        val filas = usersService.actualizarPerfil(id, email, nombre, rol)
        return if (filas > 0) "Perfil actualizado con éxito" else "No se encontró usuario con id $id"
    }

    // ACTUALIZAR CONTRASEÑA → PATCH /api/users/{id}/password
    @PatchMapping("/{id}/password")
    fun actualizarPassword(@PathVariable id: Int, @RequestBody request: Map<String, String>): String {
        val nuevaPassword = request["password"] ?: return "Campo 'password' requerido"

        val filas = usersService.actualizarPassword(id, nuevaPassword)
        return if (filas > 0) "Contraseña actualizada con éxito" else "No se encontró usuario con id $id"
    }

    // LOGIN → POST /api/users/login
    @PostMapping("/login")
    fun login(@RequestBody request: Map<String, String>): Map<String, Any> {
        val email = request["email"] ?: return mapOf("success" to false, "message" to "Email requerido")
        val password = request["password"] ?: return mapOf("success" to false, "message" to "Password requerido")

        val usuario = usersService.verificarCredenciales(email, password)
        return if (usuario != null) {
            mapOf(
                "success" to true,
                "message" to "Login exitoso",
                "user" to mapOf(
                    "id" to usuario.id,
                    "email" to usuario.email,
                    "nombre" to usuario.nombre,
                    "rol" to usuario.rol
                )
            )
        } else {
            mapOf("success" to false, "message" to "Credenciales incorrectas")
        }
    }

    // VERIFICAR EMAIL → GET /api/users/verify-email/{email}
    @GetMapping("/verify-email/{email}")
    fun verificarEmail(@PathVariable email: String): Map<String, Any> {
        val existe = usersService.existeEmail(email)
        return mapOf(
            "email" to email,
            "existe" to existe,
            "message" to if (existe) "El email ya está registrado" else "Email disponible"
        )
    }

    // DELETE → DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    fun eliminarUsuario(@PathVariable id: Int): String {
        val filas = usersService.eliminarUsuario(id)
        return if (filas > 0) "Usuario eliminado con éxito" else "No se encontró usuario con id $id"
    }
}