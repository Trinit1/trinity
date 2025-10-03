package com.example.Trinity0.Users

import java.time.LocalDateTime

data class Users(
    val id: Int = 0,                    // Auto-increment
    val email: String,                  // Email (OBLIGATORIO, ÚNICO)
    val password: String,               // Contraseña (OBLIGATORIO)
    val nombre: String,                 // Nombre (OBLIGATORIO)
    val rol: String,                     // Rol (OBLIGATORIO)
    val createdAt: LocalDateTime? = null,
    val updatedAt: LocalDateTime? = null
)