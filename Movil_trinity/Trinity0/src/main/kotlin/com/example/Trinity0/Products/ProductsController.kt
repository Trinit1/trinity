package com.example.Trinity0.Products

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/products")
class ProductsController {

    @Autowired
    lateinit var productsService: ProductsService

    // INDEX → GET /api/products
    @GetMapping
    fun obtenerProductos(): List<Products> = productsService.obtenerProductos()

    // SHOW → GET /api/products/{id}
    @GetMapping("/{id}")
    fun obtenerProducto(@PathVariable id: Int): Products? =
        productsService.obtenerProductoPorId(id)

    // PRODUCTOS POR CATEGORÍA → GET /api/products/category/{categoryId}
    @GetMapping("/category/{categoryId}")
    fun obtenerProductosPorCategoria(@PathVariable categoryId: Int): List<Products> =
        productsService.obtenerProductosPorCategoria(categoryId)

    // BUSCAR POR NOMBRE → GET /api/products/search/{nombre}
    @GetMapping("/search/{nombre}")
    fun buscarProductosPorNombre(@PathVariable nombre: String): List<Products> =
        productsService.buscarProductosPorNombre(nombre)

    // STORE → POST /api/products
    @PostMapping
    fun crearProducto(@RequestBody products: Products): String {
        val filas = productsService.crearProducto(products)
        return if (filas > 0) "Producto creado con éxito" else "No se pudo crear producto"
    }

    // UPDATE → PUT /api/products/{id}
    @PutMapping("/{id}")
    fun actualizarProducto(@PathVariable id: Int, @RequestBody products: Products): String {
        val filas = productsService.actualizarProducto(id, products)
        return if (filas > 0) "Producto actualizado con éxito" else "No se encontró producto con id $id"
    }

    // ACTUALIZAR CANTIDAD → PATCH /api/products/{id}/quantity
    @PatchMapping("/{id}/quantity")
    fun actualizarCantidad(@PathVariable id: Int, @RequestBody request: Map<String, Int>): String {
        val nuevaCantidad = request["quantity"] ?: return "Campo 'quantity' requerido"
        val filas = productsService.actualizarCantidad(id, nuevaCantidad)
        return if (filas > 0) "Cantidad actualizada con éxito" else "No se encontró producto con id $id"
    }

    // INCREMENTAR VENDIDOS → PATCH /api/products/{id}/vendidos
    @PatchMapping("/{id}/vendidos")
    fun incrementarVendidos(@PathVariable id: Int, @RequestBody request: Map<String, Int>): String {
        val cantidad = request["cantidad"] ?: return "Campo 'cantidad' requerido"
        val filas = productsService.incrementarVendidos(id, cantidad)
        return if (filas > 0) "Vendidos incrementados con éxito" else "No se encontró producto con id $id"
    }

    // DELETE → DELETE /api/products/{id}
    @DeleteMapping("/{id}")
    fun eliminarProducto(@PathVariable id: Int): String {
        val filas = productsService.eliminarProducto(id)
        return if (filas > 0) "Producto eliminado con éxito" else "No se encontró producto con id $id"
    }
}