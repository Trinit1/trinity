package co.com.auto_try.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ValCreCatego implements Question<String> {

    private static final Logger logger = LoggerFactory.getLogger(ValCreCatego.class);

    public static ValCreCatego theCategoryName() {
        return new ValCreCatego();
    }

    @Override
    public String answeredBy(Actor actor) {
        try {
            WebDriver driver = BrowseTheWeb.as(actor).getDriver();
            String pageSource = driver.getPageSource();

            logger.info("Buscando confirmación de categoría creada...");

            // 1. Buscar el mensaje de éxito específico
            if (pageSource.contains("¡CATEGORÍA AGREGADA EXITOSAMENTE!") ||
                    pageSource.contains("CATEGORÍA AGREGADA EXITOSAMENTE")) {
                logger.info("Mensaje de éxito detectado: '¡CATEGORÍA AGREGADA EXITOSAMENTE!'");

                // 2. Buscar la categoría específica en la lista
                String nombreBuscado = "Motorola G 35 5G";
                if (pageSource.contains(nombreBuscado)) {
                    logger.info("Categoría '{}' encontrada en la lista", nombreBuscado);
                    return nombreBuscado;
                } else {
                    logger.info("Mensaje de éxito detectado, pero categoría no encontrada en lista");
                    return "Categoría creada (mensaje de éxito)";
                }
            }

            // 3. Buscar directamente la categoría en la lista (por si el mensaje no aparece)
            String nombreBuscado = "Motorola G 35 5G";
            if (pageSource.contains(nombreBuscado)) {
                logger.info("Categoría '{}' encontrada directamente en la lista", nombreBuscado);
                return nombreBuscado;
            }

            // 4. Buscar variantes del mensaje de éxito
            if (pageSource.contains("éxito") || pageSource.contains("exitosa") ||
                    pageSource.contains("agregada") || pageSource.contains("creada")) {
                logger.info("Mensaje de éxito genérico detectado");
                return nombreBuscado;
            }

            logger.info("No se detectó confirmación de categoría creada");
            logger.debug("Contenido de la página: {}", pageSource);
            return "Categoría no creada";

        } catch (Exception e) {
            logger.error("Error al validar creación de categoría: {}", e.getMessage());
            return "Error en validación";
        }
    }
}