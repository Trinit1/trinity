package co.com.auto_try.stepsdefinitions;

import co.com.auto_try.questions.ValInSesion;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.Matchers.is;

public class AutenStepInSesion {

    @Dado("que el usuario se encuentra en la pagina de inicio de sesion")
    public void que_el_usuario_se_encuentra_en_la_pagina_de_inicio_de_sesion() {
        // El hook ya hizo el trabajo
        System.out.println("Pagina de login abierta por el hook");
    }

    @Cuando("el usuario ingrese las credenciales validas")
    public void el_usuario_ingrese_las_credenciales_validas(io.cucumber.datatable.DataTable dataTable) {
        // El hook ya ingreso las credenciales
        System.out.println("Credenciales ingresadas por el hook");
    }

    @Entonces("el sistema debe permitir el acceso y mostrar el panel de administrador")
    public void el_sistema_debe_permitir_el_acceso_y_mostrar_el_panel_de_administrador() {
        // Verificar que el login fue exitoso
        theActorInTheSpotlight().should(
                seeThat("El panel de administrador es visible",
                        ValInSesion.ValInSesion(),
                        is(true)
                )
        );
    }
}