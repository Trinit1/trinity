package co.com.auto_try.tasks;

import co.com.auto_try.models.CreCatego;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;

import java.util.List;

import static co.com.auto_try.userinterface.PagCreCatego.*;

public class ConfirCatego implements Task {

    private final List<CreCatego> credenciales;

    public ConfirCatego(List<CreCatego>credenciales) {
        this.credenciales = credenciales;
    }

    public static ConfirCatego aute(List<CreCatego> credenciales) {
        return Tasks.instrumented(ConfirCatego.class, credenciales);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        CreCatego CreCatego = credenciales.get(0);

        actor.attemptsTo(
                Enter.theValue(CreCatego.getNombreCatego()).into(INPUT_NOMBRE_CATEGORIA),
                Enter.theValue(CreCatego.getUrlImgCatego()).into(INPUT_URL_IMAGEN),
                Enter.theValue(CreCatego.getDescripCatego()).into(INPUT_DESCRIPCION),
                Click.on(BTN_CREAR_CATEGORIA)
        );
    }
}