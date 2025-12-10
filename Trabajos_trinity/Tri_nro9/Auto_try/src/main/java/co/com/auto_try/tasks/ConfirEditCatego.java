package co.com.auto_try.tasks;

import co.com.auto_try.models.EditCatego;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.*;
import net.serenitybdd.screenplay.waits.WaitUntil;
import static co.com.auto_try.userinterface.PagEditCatego.*;


import java.util.List;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isClickable;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ConfirEditCatego implements Task {

    private final List<EditCatego> datosEdicion;

    public ConfirEditCatego(List<EditCatego> datosEdicion) {
        this.datosEdicion = datosEdicion;
    }

    public static ConfirEditCatego aute(List<EditCatego> datosEdicion) {
        return Tasks.instrumented(ConfirEditCatego.class, datosEdicion);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        EditCatego editCatego = datosEdicion.get(0);

        actor.attemptsTo(
                Scroll.to(CATEGORIA_MOTOROLA),
                Scroll.to(BOTON_EDITAR_CATEGORIA),
                JavaScriptClick.on(BOTON_EDITAR_CATEGORIA),
                WaitUntil.the(INPUT_NOMBRE_CATEGORIA, isVisible()).forNoMoreThan(10).seconds(),
                Clear.field(INPUT_NOMBRE_CATEGORIA),
                Enter.theValue(editCatego.getEdNombreCatego()).into(INPUT_NOMBRE_CATEGORIA),
                Enter.theValue(editCatego.getEdUrlImgCatego()).into(INPUT_URL_IMAGEN),
                Enter.theValue(editCatego.getEdDescripCatego()).into(INPUT_DESCRIPCION),
                WaitUntil.the(BTN_GUARDAR_CAMBIOS, isVisible()).forNoMoreThan(10).seconds(),
                WaitUntil.the(BTN_GUARDAR_CAMBIOS, isClickable()).forNoMoreThan(10).seconds(),
                Scroll.to(BTN_GUARDAR_CAMBIOS),
                Click.on(BTN_GUARDAR_CAMBIOS)
        );
    }
}