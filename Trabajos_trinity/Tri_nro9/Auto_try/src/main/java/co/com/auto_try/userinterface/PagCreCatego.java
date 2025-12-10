package co.com.auto_try.userinterface;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl(value = "http://localhost:4200/stock")
public class PagCreCatego extends PageObject {

    public static final Target INPUT_NOMBRE_CATEGORIA = Target.the("campo de nombre de categoría")
            .located(By.cssSelector("input[name='nombreCategoria']"));

    public static final Target INPUT_URL_IMAGEN = Target.the("campo de URL de imagen")
            .located(By.cssSelector("input[name='imagenCategoria']"));

    public static final Target INPUT_DESCRIPCION = Target.the("campo de descripción")
            .located(By.cssSelector("input[name='descripcionCategoria']"));

    public static final Target BTN_CREAR_CATEGORIA = Target.the("botón agregar categoría")
            .located(By.xpath("//button[contains(text(), 'Agregar categoría')]"));

    public static final Target MENSAJE_EXITO = Target.the("mensaje de éxito")
            .located(By.xpath("//*[contains(text(), 'éxito') or contains(text(), 'exitosa') or contains(text(), 'creada') or contains(text(), 'agregada')]"));

}