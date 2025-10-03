package com.example.Trinity0.Movements
import java.time.LocalDateTime

data class Movements(
    val id: Int = 0,                    // Auto-increment
    val product_id: Int,                // ID del producto relacionado
    val type: String,                   // Tipo de movimiento: "ENTRADA" o "SALIDA"
    val qty: Int,                       // Cantidad movida
    val date: LocalDateTime,            // Fecha y hora del movimiento
    val note: String?,                  // Nota opcional
    val responsible: String             // Persona responsable
)