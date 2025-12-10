package co.com.auto_try.tasks;

import co.com.auto_try.models.InSesion;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.auto_try.userinterface.PagLogin.*;

public class CreInSesion implements Task{

    private final List<InSesion> credenciales;

    public CreInSesion(List<InSesion> credenciales) {
        this.credenciales = credenciales;
    }

    public static CreInSesion aute(List<InSesion> credenciales) {
        return Tasks.instrumented(CreInSesion.class, credenciales);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        // AÑADIR SOLO ESTAS LÍNEAS PARA DEBUG
        System.out.println("=== DEBUG: Credenciales para login ===");
        System.out.println("Email: " + credenciales.get(0).getUsuario());
        System.out.println("Password: " + credenciales.get(0).getClave());
        System.out.println("=== FIN DEBUG ===");

        // TU CÓDIGO ORIGINAL SIN CAMBIOS
        actor.attemptsTo(
                Click.on(INPUT_USUARIO),
                Enter.theValue(credenciales.get(0).getUsuario()).into(INPUT_USUARIO),
                Click.on(INPUT_CLAVE),
                Enter.theValue(credenciales.get(0).getClave()).into(INPUT_CLAVE),
                Click.on(BTN_LOGIN)
        );
    }
}
