package com.example.Trinity0.Movements

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/movements")
class MovementsController {

    @Autowired
    lateinit var movementsService: MovementsService

    // INDEX → GET /api/movements
    @GetMapping
    fun obtenerMovimientos(): List<Movements> = movementsService.obtenerMovimientos()

    // SHOW → GET /api/movements/{id}
    @GetMapping("/{id}")
    fun obtenerMovimiento(@PathVariable id: Int): Movements? =
        movementsService.obtenerMovimientoPorId(id)

    // MOVIMIENTOS POR PRODUCTO → GET /api/movements/product/{productId}
    @GetMapping("/product/{productId}")
    fun obtenerMovimientosPorProducto(@PathVariable productId: Int): List<Movements> =
        movementsService.obtenerMovimientosPorProducto(productId)

    // STORE → POST /api/movements
    @PostMapping
    fun crearMovimiento(@RequestBody movements: Movements): String {
        val filas = movementsService.crearMovimiento(movements)
        return if (filas > 0) "Movimiento creado con éxito" else "No se pudo crear movimiento"
    }

    // STORE CON FECHA AUTOMÁTICA → POST /api/movements/auto-date
    @PostMapping("/auto-date")
    fun crearMovimientoConFechaAuto(@RequestBody movements: Movements): String {
        val filas = movementsService.crearMovimientoConFechaActual(movements)
        return if (filas > 0) "Movimiento creado con éxito (fecha automática)" else "No se pudo crear movimiento"
    }

    // UPDATE → PUT /api/movements/{id}
    @PutMapping("/{id}")
    fun actualizarMovimiento(@PathVariable id: Int, @RequestBody movements: Movements): String {
        val filas = movementsService.actualizarMovimiento(id, movements)
        return if (filas > 0) "Movimiento actualizado con éxito" else "No se encontró movimiento con id $id"
    }

    // DELETE → DELETE /api/movements/{id}
    @DeleteMapping("/{id}")
    fun eliminarMovimiento(@PathVariable id: Int): String {
        val filas = movementsService.eliminarMovimiento(id)
        return if (filas > 0) "Movimiento eliminado con éxito" else "No se encontró movimiento con id $id"
    }
}