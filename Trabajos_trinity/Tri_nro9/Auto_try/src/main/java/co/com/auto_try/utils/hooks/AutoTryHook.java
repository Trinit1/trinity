package co.com.auto_try.utils.hooks;

import co.com.auto_try.models.InSesion;
import co.com.auto_try.tasks.AbrirPagInSesion;
import co.com.auto_try.tasks.CreInSesion;
import co.com.auto_try.tasks.ConfirCatego;
import co.com.auto_try.userinterface.PagCreCatego;
import co.com.auto_try.userinterface.PagEliminCatego;
import co.com.auto_try.userinterface.PagEditCatego;
import io.cucumber.java.Before;
import net.serenitybdd.screenplay.actions.Open;
import net.serenitybdd.screenplay.actors.OnlineCast;

import java.util.Arrays;
import java.util.List;

import static net.serenitybdd.screenplay.actors.OnStage.setTheStage;
import static net.serenitybdd.screenplay.actors.OnStage.theActorCalled;

    public class AutoTryHook {

        @Before
        public void configurarEscenario() {
            System.setProperty("webdriver.chrome.driver",
                    "src/test/java/co/com/auto_try/driver/chromedriver.exe");

            setTheStage(new OnlineCast());
            theActorCalled("usuario");
        }

    @Before("@login")
    public void bflogin() {
        setTheStage(new OnlineCast());

        InSesion credencial = new InSesion();
        credencial.setUsuario("keving@correo.com");
        credencial.setClave("G43rr3r0");

        List<InSesion> credenciales = Arrays.asList(credencial);

        theActorCalled("Conductor").wasAbleTo(
                AbrirPagInSesion.lapagina(),    // Abre la página
                CreInSesion.aute(credenciales)  // Realiza el login
        );
    }

    @Before("@crearCategoria")
    public void bfcrearCategoria() {
            setTheStage(new OnlineCast());

        InSesion credencial = new InSesion();
        credencial.setUsuario("keving@correo.com");
        credencial.setClave("G43rr3r0");

        List<InSesion> credenciales = Arrays.asList(credencial);

        theActorCalled("usuario").wasAbleTo(
                AbrirPagInSesion.lapagina(),    // Abre página de login
                CreInSesion.aute(credenciales), // Hace login
                Open.browserOn(new PagCreCatego())  // Navega a la página de categorías
        );

        System.out.println("Hook de categorías ejecutado - Usuario autenticado y listo para crear categorías");
    }

    @Before("@editarCategoria")
    public void bfeditarCategoria() {
            setTheStage(new OnlineCast());

            InSesion credencial = new InSesion();
            credencial.setUsuario("keving@correo.com");
            credencial.setClave("G43rr3r0");

            List<InSesion> credenciales = Arrays.asList(credencial);

            theActorCalled("usuario").wasAbleTo(
                    AbrirPagInSesion.lapagina(),
                    CreInSesion.aute(credenciales),
                    Open.browserOn(new PagEditCatego())
            );

            System.out.println("Hook de edición de categorías ejecutado - Usuario autenticado y listo para editar categorías");
        }

        @Before("@eliminarCategoria")
        public void bfeliminarCategoria() {
            setTheStage(new OnlineCast());

            InSesion credencial = new InSesion();
            credencial.setUsuario("keving@correo.com");
            credencial.setClave("G43rr3r0");

            List<InSesion> credenciales = Arrays.asList(credencial);

            theActorCalled("usuario").wasAbleTo(
                    AbrirPagInSesion.lapagina(),
                    CreInSesion.aute(credenciales),
                    Open.browserOn(new PagEliminCatego())
            );

            System.out.println("Hook de eliminación de categorías ejecutado - Usuario autenticado y listo para eliminar categorías");
        }

}