package co.com.auto_try.stepsdefinitions;

import co.com.auto_try.models.EliminCatego;
import co.com.auto_try.questions.ValEliminCatego;
import co.com.auto_try.tasks.ConfirEliminCatego;
import io.cucumber.java.es.Dado;
import io.cucumber.java.es.Cuando;
import io.cucumber.java.es.Entonces;
import io.cucumber.java.es.Y;

import java.util.List;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.equalTo;

public class AutenStepEliminCatego {

    @Dado("que el usuario quiere eliminar una categoria")
    public void que_el_usuario_quiere_eliminar_una_categoria() {
        System.out.println("Usuario autenticado y listo para eliminar categoría");
        // Este paso es principalmente de configuración, el hook ya hizo el login
    }

    @Cuando("el usuario confirma la eliminacion de la categoria")
    public void el_usuario_confirma_la_eliminacion_de_la_categoria(List<EliminCatego> datosEliminacion) {
        theActorInTheSpotlight().attemptsTo(
                ConfirEliminCatego.aute(datosEliminacion)
        );
    }

    @Entonces("la categoria deberia ser eliminada exitosamente")
    public void la_categoria_deberia_ser_eliminada_exitosamente() {
        theActorInTheSpotlight().should(
                seeThat(ValEliminCatego.theDeletedCategory(), equalTo(true))
        );
    }
}