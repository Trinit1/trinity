package co.com.auto_try.tasks;

import co.com.auto_try.userinterface.PagLogin;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Open;

public class AbrirPagInSesion implements Task {

    private PagLogin pagLogin;

    public static AbrirPagInSesion lapagina() {
        return Tasks.instrumented(AbrirPagInSesion.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(Open.browserOn(pagLogin));
    }
}
