  #language: es
  #autor: Kevin

    Característica: Creación de categorías en Trinity
    Como usuario de Trinity
    Quiero crear nuevas categorías en el sistema
    Para poder organizar mejor los contenidos y productos

    @crearCategoria
    Escenario: Crear una nueva categoría en el sistema Trinity
      Dado que el usuario quiere crear una categoria
      Cuando el usuario ingresa los datos de la categoria
        | Nombre           | Url                                                                                    | Descripcion            |
        | Motorola G 35 5G | https://p1-ofp.static.pub//fes/cms/2025/05/28/oofko1sfib18nzhhjau4aa7q48rgeo216340.png | Creado Automaticamente |
      Entonces el usuario deberia ver la categoria creada con el nombre "Motorola G 35 5G"
      Y el usuario confirma la creacion de la categoria