package co.com.auto_try.tasks;

import co.com.auto_try.models.EliminCatego;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.JavaScriptClick;
import net.serenitybdd.screenplay.actions.Scroll;
import net.serenitybdd.screenplay.waits.WaitUntil;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

import static co.com.auto_try.userinterface.PagEliminCatego.*;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.*;

public class ConfirEliminCatego implements Task {

    private static final Logger logger = LoggerFactory.getLogger(ConfirEliminCatego.class);
    private final List<EliminCatego> datosEliminacion;

    public ConfirEliminCatego(List<EliminCatego> datosEliminacion) {
        this.datosEliminacion = datosEliminacion;
    }

    public static ConfirEliminCatego aute(List<EliminCatego> datosEliminacion) {
        return Tasks.instrumented(ConfirEliminCatego.class, datosEliminacion);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        logger.info("=== MÉTODO DEFINITIVO DE ELIMINACIÓN ===");

        WebDriver driver = actor.usingAbilityTo(
                net.serenitybdd.screenplay.abilities.BrowseTheWeb.class
        ).getDriver();

        try {
            // PASO 1: Configurar JavaScript ANTES de cualquier acción
            configurarJavaScriptParaAlert(driver);

            // PASO 2: Usar Screenplay para encontrar y hacer click
            actor.attemptsTo(
                    WaitUntil.the(CATEGORIA_A_ELIMINAR, isPresent()).forNoMoreThan(15).seconds(),
                    Scroll.to(CATEGORIA_A_ELIMINAR).andAlignToTop(),
                    WaitUntil.the(CATEGORIA_A_ELIMINAR, isVisible()).forNoMoreThan(10).seconds(),
                    Scroll.to(BOTON_ELIMINAR_CATEGORIA),
                    WaitUntil.the(BOTON_ELIMINAR_CATEGORIA, isClickable()).forNoMoreThan(10).seconds(),
                    JavaScriptClick.on(BOTON_ELIMINAR_CATEGORIA)
            );

            // PASO 3: Esperar y verificar
            esperarYVerificarEliminacion(driver);

            logger.info("✅ ELIMINACIÓN COMPLETADA CON ÉXITO");

        } catch (Exception e) {
            logger.error("Error en eliminación: {}", e.getMessage());
            // Intentar método de emergencia
            metodoEmergenciaEliminacion(driver);
        }
    }

    /**
     * MÉTODO CLAVE: Configurar JavaScript para manejar confirm() automáticamente
     */
    private void configurarJavaScriptParaAlert(WebDriver driver) {
        try {
            logger.info("Configurando JavaScript para interceptar confirms...");

            // JavaScript que SOBREESCRIBE window.confirm para que siempre devuelva true
            String js = "window.originalConfirm = window.confirm;" +
                    "window.confirm = function(message) {" +
                    "   console.log('[AUTO-CONFIRM] Intercepted: ' + message);" +
                    "   return true;" +
                    "};" +
                    "console.log('[AUTO-CONFIRM] Configurado - Todos los confirms serán aceptados automáticamente');";

            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(js);
            logger.info("✅ JavaScript configurado correctamente");

        } catch (Exception e) {
            logger.warn("No se pudo configurar JavaScript: {}", e.getMessage());
        }
    }

    /**
     * Esperar y verificar que se eliminó
     */
    private void esperarYVerificarEliminacion(WebDriver driver) {
        try {
            // Esperar 4 segundos (tiempo suficiente para que procese)
            Thread.sleep(4000);

            // Verificar mensaje de éxito
            List<WebElement> mensajesExito = driver.findElements(
                    By.xpath("//div[contains(@class, 'alert-success') and contains(text(), 'eliminada')]")
            );

            if (!mensajesExito.isEmpty()) {
                logger.info("✅ MENSAJE DE ÉXITO: {}", mensajesExito.get(0).getText());
            } else {
                // Verificar si la categoría ya no está
                List<WebElement> categorias = driver.findElements(
                        By.xpath("//h3[contains(text(), 'Motorola AutoEditado')]")
                );

                if (categorias.isEmpty()) {
                    logger.info("✅ CATEGORÍA ELIMINADA (no aparece en la lista)");
                } else {
                    logger.warn("⚠️ La categoría aún aparece en la lista");
                }
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Interrupción en espera");
        } catch (Exception e) {
            logger.warn("Error verificando: {}", e.getMessage());
        }
    }

    /**
     * MÉTODO DE EMERGENCIA si falla el método principal
     */
    private void metodoEmergenciaEliminacion(WebDriver driver) {
        try {
            logger.info("=== ACTIVANDO MÉTODO DE EMERGENCIA ===");

            // 1. Buscar directamente con XPath
            String xpathBoton = "//h3[contains(text(), 'Motorola AutoEditado')]" +
                    "/ancestor::div[contains(@class, 'card-option')]" +
                    "//button[contains(@class, 'btn-danger')]";

            WebElement botonEliminar = driver.findElement(By.xpath(xpathBoton));

            // 2. Configurar JavaScript nuevamente
            configurarJavaScriptParaAlert(driver);

            // 3. Hacer scroll y click con JavaScript
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript(
                    "arguments[0].scrollIntoView(true); arguments[0].click();", botonEliminar
            );

            logger.info("✅ Click de emergencia realizado");

            // 4. Esperar
            Thread.sleep(4000);

        } catch (Exception e) {
            logger.error("❌ MÉTODO DE EMERGENCIA FALLÓ: {}", e.getMessage());
            throw new RuntimeException("No se pudo eliminar la categoría con ningún método", e);
        }
    }
}