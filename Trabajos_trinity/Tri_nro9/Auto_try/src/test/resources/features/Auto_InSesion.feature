  #language: es
  #autor: Kevin

    Característica: Autenticacion en la pagina de inicio de sesion en Trinity
      Como usuario administrador de Trinity
    Quiero iniciar sesion en la pagina
    Para poder acceder al contenido y funcionales de administrador

    @login
    Escenario: Verificar la autenticacion exitosa en la pagina de Trinity
      Dado que el usuario se encuentra en la pagina de inicio de sesion
      Cuando el usuario ingrese las credenciales validas
        | Usuario           | Clave    |
        | keving@correo.com | G43rr3r0 |
      Entonces el sistema debe permitir el acceso y mostrar el panel de administrador