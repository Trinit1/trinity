package com.example.Trinity0.Products

data class Products(
    val id: Int = 0,                    // Auto-increment
    val name: String,                   // Nombre del producto (OBLIGATORIO)
    val quantity: Int,                  // Cantidad en stock (OBLIGATORIO)
    val category_id: Int,               // ID de categoría (OBLIGATORIO)
    val imageUrl: String?,              // URL de imagen (OPCIONAL)
    val vendidos: Int = 0,              // Cantidad vendida, por defecto 0
)