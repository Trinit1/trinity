package co.com.auto_try.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.TimeoutException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class ValEliminCatego implements Question<Boolean> {

    private static final Logger logger = LoggerFactory.getLogger(ValEliminCatego.class);

    public static ValEliminCatego theDeletedCategory() {
        return new ValEliminCatego();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            WebDriver driver = BrowseTheWeb.as(actor).getDriver();

            logger.info("=== INICIANDO VALIDACIÓN DE ELIMINACIÓN ===");

            // 1. Buscar mensaje de éxito - SOLO UNA DECLARACIÓN
            boolean mensajeExitoVisible = buscarMensajeExito(driver);

            // 2. Verificar que categoría fue eliminada - SOLO UNA DECLARACIÓN
            boolean categoriaEliminada = verificarCategoriaEliminada(driver);

            // 3. Resultado final
            boolean validacionExitosa = mensajeExitoVisible && categoriaEliminada;

            logger.info("=== RESULTADO VALIDACIÓN ===");
            logger.info("Mensaje éxito: {}", mensajeExitoVisible ? "✅ ENCONTRADO" : "❌ NO ENCONTRADO");
            logger.info("Categoría eliminada: {}", categoriaEliminada ? "✅ SÍ" : "❌ NO");
            logger.info("Validación final: {}", validacionExitosa ? "✅✅✅ ÉXITO" : "❌❌❌ FALLO");

            return validacionExitosa;

        } catch (Exception e) {
            logger.error("Error en validación: {}", e.getMessage());
            return false;
        }
    }

    private boolean buscarMensajeExito(WebDriver driver) {
        try {
            logger.info("Buscando mensaje de éxito...");

            // Esperar un momento para que aparezca el mensaje
            Thread.sleep(2000);

            // Múltiples selectores posibles
            String[] selectores = {
                    "//div[contains(@class, 'alert-success') and contains(text(), 'eliminada')]",
                    "//div[contains(@class, 'alert-success')]",
                    "//*[contains(text(), 'Categoría eliminada')]",
                    "//*[contains(text(), 'eliminada correctamente')]",
                    "//div[contains(@class, 'alert') and contains(., 'eliminada')]"
            };

            for (String selector : selectores) {
                try {
                    List<WebElement> elementos = driver.findElements(By.xpath(selector));
                    if (!elementos.isEmpty()) {
                        String texto = elementos.get(0).getText();
                        logger.info("✅ Mensaje encontrado: '{}'", texto);
                        return true;
                    }
                } catch (Exception e) {
                    // Continuar con siguiente selector
                }
            }

            logger.info("No se encontró mensaje de éxito visible");
            return false;

        } catch (Exception e) {
            logger.warn("Error buscando mensaje: {}", e.getMessage());
            return false;
        }
    }

    private boolean verificarCategoriaEliminada(WebDriver driver) {
        try {
            logger.info("Verificando si categoría fue eliminada...");

            // Buscar la categoría
            List<WebElement> categorias = driver.findElements(
                    By.xpath("//h3[contains(text(), 'Motorola') or contains(text(), 'MOTOROLA')]")
            );

            if (categorias.isEmpty()) {
                logger.info("✅ Categoría no encontrada - eliminación exitosa");
                return true;
            }

            // Si se encontró, mostrar qué se encontró
            logger.info("❌ Categorías encontradas después de intentar eliminar:");
            for (WebElement cat : categorias) {
                logger.info("   - '{}'", cat.getText());
            }
            return false;

        } catch (Exception e) {
            logger.warn("Error verificando categoría: {}", e.getMessage());
            return false;
        }
    }
}