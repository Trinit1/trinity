package co.com.auto_try.stepsdefinitions;

import co.com.auto_try.models.EditCatego;
import co.com.auto_try.questions.ValEditCatego;
import co.com.auto_try.tasks.ConfirEditCatego;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;
import io.cucumber.java.DataTableType;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.equalTo;

public class AutenStepEditCatego {

    @DataTableType
    public EditCatego defineEditCatego(Map<String, String> entry) {
        EditCatego edit Catego = new EditCatego();
        editCatego.setEdNombreCatego(entry.get("Nombre"));
        editCatego.setEdUrlImgCatego(entry.get("Url"));
        editCatego.setEdDescripCatego(entry.get("Descripcion"));
        return editCatego;
    }

    @Dado("que el usuario quiere editar una categoria")
    public void que_el_usuario_quiere_editar_una_categoria() {
        // El hook ya configuró la sesión y navegación
        System.out.println("Usuario autenticado y listo para editar categoría");
    }

    @Cuando("el usuario edita los datos de la categoria")
    public void el_usuario_edita_los_datos_de_la_categoria(List<EditCatego> editCategories) {
        theActorInTheSpotlight().attemptsTo(
                ConfirEditCatego.aute(editCategories)
        );
    }

    @Entonces("el usuario deberia ver la categoria editada con el nombre {string}")
    public void el_usuario_deberia_ver_la_categoria_editada_con_el_nombre(String nombreCategoria) {
        theActorInTheSpotlight().should(
                seeThat("El nombre de la categoría editada",
                        ValEditCatego.theEditedCategoryName(),
                        equalTo(nombreCategoria)
                )
        );
    }

    @Y("el usuario confirma la edicion de la categoria")
    public void el_usuario_confirma_la_edicion_de_la_categoria() {
        System.out.println("Confirmación de edición de categoría");
    }
}