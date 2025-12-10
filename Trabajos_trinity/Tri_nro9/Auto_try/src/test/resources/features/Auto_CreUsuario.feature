#language: es
#autor: Kevin

Característica: Creación de usuarios en el sistema
  Como usuario del sistema Trinity
  Quiero crear nuevos usuarios en la plataforma
  Para gestionar accesos y permisos de los diferentes roles

  @crearUsuario
  Escenario: Crear un nuevo usuario de administrador en el sistema
    Dado que se quiere crear un usuario nuevo
    Cuando se ingresa los datos del usuario nuevo
      | Nombre Completo | Nombre Usuario  | Clave | Rol   |
      | Jhon            | Jh0n@correo.com | Jh0n  | Admin |
    Entonces el sistema debería crear el usuario con nombre de usuario "Jh0n@correo.com"
    Y el usuario debería tener el rol "ADMIN"
    Y el usuario confirma la creación del usuario