package co.com.auto_try.userinterface;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl(value = "http://localhost:4200/login")
public class PagLogin extends PageObject {

    public static final Target INPUT_USUARIO = Target.the("campo de email")
            .located(By.cssSelector("[name='email']"));

    public static final Target INPUT_CLAVE = Target.the("campo de contraseña")
            .located(By.cssSelector("[name='password']"));

    public static final Target BTN_LOGIN = Target.the("botón de login")
            .located(By.cssSelector("button[type='submit']"));

    public static final Target MENSAJE_BIENVENIDA = Target.the("mensaje de bienvenida")
            .located(By.xpath("//*[contains(text(), 'Usuario') or contains(text(), 'Bienvenido')]"));
}