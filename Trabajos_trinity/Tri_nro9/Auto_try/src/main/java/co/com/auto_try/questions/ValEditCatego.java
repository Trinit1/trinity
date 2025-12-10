package co.com.auto_try.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ValEditCatego implements Question<String> {

    private static final Logger logger = LoggerFactory.getLogger(ValEditCatego.class);

    public static ValEditCatego theEditedCategoryName() {
        return new ValEditCatego();
    }

    @Override
    public String answeredBy(Actor actor) {
        try {
            WebDriver driver = BrowseTheWeb.as(actor).getDriver();
            String pageSource = driver.getPageSource();

            logger.info("Buscando confirmación de categoría editada...");

            // Buscar mensajes de éxito para edición
            if (pageSource.contains("EDITADA EXITOSAMENTE") ||
                    pageSource.contains("ACTUALIZADA") ||
                    pageSource.contains("MODIFICADA") ||
                    pageSource.contains("ACTUALIZACIÓN EXITOSA") ||
                    pageSource.contains("CATEGORÍA ACTUALIZADA")) {

                logger.info("Mensaje de edición exitosa detectado");
            }

            // Buscar directamente la categoría editada con diferentes variantes
            String nombreBuscado = "Motorola Editado";

            // Variante 1: Texto exacto
            if (pageSource.contains(nombreBuscado)) {
                logger.info("Categoría editada '{}' encontrada en la lista", nombreBuscado);
                return nombreBuscado;
            }

            // Variante 2: Buscar en estructura HTML específica
            if (pageSource.contains("Motorola") && pageSource.contains("Editado")) {
                logger.info("Categoría editada encontrada (variante combinada)");
                return nombreBuscado;
            }

            // Variante 3: Buscar en elementos h3 (donde suelen estar los nombres)
            if (pageSource.contains("<h3") && pageSource.contains("Motorola")) {
                // Extraer texto alrededor de Motorola para debug
                int index = pageSource.indexOf("Motorola");
                if (index != -1) {
                    int start = Math.max(0, index - 30);
                    int end = Math.min(pageSource.length(), index + 30);
                    String contexto = pageSource.substring(start, end);
                    logger.info("Texto alrededor de 'Motorola': {}", contexto);

                    if (contexto.contains("Editado")) {
                        logger.info("Categoría editada encontrada en contexto h3");
                        return nombreBuscado;
                    }
                }
            }

            // Debug: mostrar si hay algún "Motorola" en la página
            if (pageSource.contains("Motorola")) {
                logger.info("Se encontró 'Motorola' en la página, pero no la versión editada");
            } else {
                logger.info("No se encontró 'Motorola' en la página");
            }

            logger.info("No se detectó confirmación de categoría editada");
            return "Categoría no editada";

        } catch (Exception e) {
            logger.error("Error al validar edición de categoría: {}", e.getMessage());
            return "Error en validación";
        }
    }
}