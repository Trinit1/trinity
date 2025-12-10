package co.com.auto_try.stepsdefinitions;

import co.com.auto_try.models.CreCatego;
import co.com.auto_try.questions.ValCreCatego;
import co.com.auto_try.tasks.ConfirCatego;
import io.cucumber.java.DataTableType;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.equalTo;

public class AutenStepCreCatego {

    @DataTableType
    public CreCatego defineCreCatego(Map<String, String> entry) {
        CreCatego creCatego = new CreCatego();
        creCatego.setNombreCatego(entry.get("Nombre"));
        creCatego.setUrlImgCatego(entry.get("Url"));
        creCatego.setDescripCatego(entry.get("Descripcion"));
        return creCatego;
    }

    @Dado("que el usuario quiere crear una categoria")
    public void que_el_usuario_quiere_crear_una_categoria() {
        // El hook ya configuró la sesión y navegación
        System.out.println("Usuario autenticado y listo para crear categoría");
    }

    @Cuando("el usuario ingresa los datos de la categoria")
    public void el_usuario_ingresa_los_datos_de_la_categoria(List<CreCatego> creCategories) {
        theActorInTheSpotlight().attemptsTo(
                ConfirCatego.aute(creCategories)
        );
    }

    @Entonces("el usuario deberia ver la categoria creada con el nombre {string}")
    public void el_usuario_deberia_ver_la_categoria_creada_con_el_nombre(String nombreCategoria) {
        theActorInTheSpotlight().should(
                seeThat("El nombre de la categoría creada",
                        ValCreCatego.theCategoryName(),
                        equalTo(nombreCategoria)
                )
        );
    }

    @Y("el usuario confirma la creacion de la categoria")
    public void el_usuario_confirma_la_creacion_de_la_categoria() {
        System.out.println("Confirmación de categoría - Pendiente implementar");
    }
}