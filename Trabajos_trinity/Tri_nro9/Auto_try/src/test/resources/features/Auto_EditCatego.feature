#language: es
#autor: Kevin

Característica: Edición de categorías en Trinity
  Como usuario de Trinity
  Quiero editar categorías existentes en el sistema
  Para poder actualizar la información de las categorías

  @editarCategoria
  Escenario: Editar una categoría existente en el sistema Trinity
    Dado que el usuario quiere editar una categoria
    Cuando el usuario edita los datos de la categoria
      | Nombre               | Url                                                            | Descripcion       |
      | Motorola AutoEditado | https://p1-ofp.static.pub//fes/cms/2025/05/28/nueva-imagen.png | Auto Editado Moto |
    Entonces el usuario deberia ver la categoria editada con el nombre "Motorola Editado"
    Y el usuario confirma la edicion de la categoria