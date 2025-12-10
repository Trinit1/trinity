#language: es
#autor: Kevin

Característica: Eliminación de categorías en Trinity
  Como usuario de Trinity
  Quiero eliminar categorías existentes en el sistema
  Para mantener el catálogo actualizado y organizado

  @eliminarCategoria
  Escenario: Eliminar una categoría existente en el sistema Trinity
    Dado que el usuario quiere eliminar una categoria
    Cuando el usuario confirma la eliminacion de la categoria
      | ElNombreCatego   |
      | Motorola AutoEditado |
    Entonces la categoria deberia ser eliminada exitosamente