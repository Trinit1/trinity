package com.example.Trinity0.Categories

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
class CategoriesController {

    @Autowired
    lateinit var CategoriesService: CategoriesService


    @GetMapping("/categories")
    fun obtenerCategorias(): List<Categories> = CategoriesService.obtenerCategorias()


    @GetMapping("/categories/{id}")
    fun obtenerCategoria(@PathVariable id: Int): Categories? =
        CategoriesService.obtenerCategoriaPorId(id)x


    @PostMapping("/categories")
    fun crearCategoria(@RequestBody categories: Categories): String {
        val filas = CategoriesService.crearCategoria(categories)
        return if (filas > 0) "Categoría creada con éxito" else "No se pudo crear categoría"
    }


    @PutMapping("/categories/{id}")
    fun actualizarCategoria(@PathVariable id: Int, @RequestBody categories: Categories): String {
        val filas = CategoriesService.actualizarCategoria(id, categories)
        return if (filas > 0) "Categoría actualizada con éxito" else "No se encontró categoría con id $id"
    }


    @DeleteMapping("/categories/{id}")
    fun eliminarCategoria(@PathVariable id: Int): String {
        val filas = CategoriesService.eliminarCategoria(id)
        return if (filas > 0) "Categoría eliminada con éxito" else "No se encontró categoría con id $id"
    }
}