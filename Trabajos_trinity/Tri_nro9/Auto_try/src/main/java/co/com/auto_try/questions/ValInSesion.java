package co.com.auto_try.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static co.com.auto_try.userinterface.PagLogin.MENSAJE_BIENVENIDA;

public class ValInSesion implements Question<Boolean> {
    private static final Logger logger = LoggerFactory.getLogger(ValInSesion.class);

    public static ValInSesion ValInSesion() {
        return new ValInSesion();
    }

    @Override
    public Boolean answeredBy(Actor actor) {
        try {
            WebDriver driver = BrowseTheWeb.as(actor).getDriver();

            String currentUrl = driver.getCurrentUrl();
            String pageTitle = driver.getTitle();

            logger.info("URL después del login: {}", currentUrl);
            logger.info("Título después del login: {}", pageTitle);

            boolean noEsPaginaLogin = !currentUrl.contains("login") &&
                    !pageTitle.toLowerCase().contains("login");

            if (noEsPaginaLogin) {
                logger.info("Login exitoso - Redirigido a: {}", currentUrl);
                return true;
            }
            logger.info("Login fallido - Seguimos en página de login");
            return false;

        } catch (Exception e) {
            logger.error("Error al validar sesión: {}", e.getMessage());
            return false;
        }
    }
}