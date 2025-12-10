package co.com.auto_try.userinterface;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl(value = "http://localhost:4200/stock")
public class PagEditCatego extends PageObject {


    public static final Target INPUT_NOMBRE_CATEGORIA = Target.the("campo de nombre de categoría")
            .located(By.cssSelector("input[name='nombreCategoria']"));

    public static final Target INPUT_URL_IMAGEN = Target.the("campo de URL de imagen")
            .located(By.cssSelector("input[name='imagenCategoria']"));

    public static final Target INPUT_DESCRIPCION = Target.the("campo de descripción")
            .located(By.cssSelector("input[name='descripcionCategoria']"));

    public static final Target BTN_GUARDAR_CAMBIOS = Target.the("Botón actualizar categoría")
            .located(By.xpath("//button[contains(text(), 'Actualizar categoría')]"));

    public static final Target CATEGORIA_MOTOROLA = Target.the("Categoría Motorola")
            .located(By.xpath("//h3[contains(text(), 'Motorola')]"));

    public static final Target BOTON_EDITAR_CATEGORIA = Target.the("Botón editar categoría Motorola")
            .located(By.xpath("//h3[contains(text(), 'Motorola')]/following-sibling::div//button[contains(text(), 'Editar')]"));
}