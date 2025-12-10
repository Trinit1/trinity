package co.com.auto_try.stepsdefinitions;

import co.com.auto_try.models.EditCatego;
import io.cucumber.java.DataTableType;

import java.util.Map;

import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static net.serenitybdd.screenplay.actors.OnStage.theActorInTheSpotlight;
import static org.hamcrest.CoreMatchers.equalTo;
public class AutenStepCreUsuario {

    @DataTableType
    plublic CreUsuario editCreUsuarios(Map<String, String> entry){
        CreUsuario.editCreUsuario = new EditCatego();
        CreUsuario.setNombreComUsu(entry.get("nombreCompUsu"));
        CreUsuario.setnombreUsu(entry.get("nombreUsu"));
        CreUsuario.setclaveUsu(entry.get("rolUsu"));
    }
}
