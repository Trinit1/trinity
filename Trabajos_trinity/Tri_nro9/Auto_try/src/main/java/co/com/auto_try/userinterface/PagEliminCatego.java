package co.com.auto_try.userinterface;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;
import org.openqa.selenium.By;

@DefaultUrl(value = "http://localhost:4200/stock")
public class PagEliminCatego extends PageObject {

    public static final Target CATEGORIA_A_ELIMINAR = Target.the("Categoría a eliminar")
            .located(By.xpath("//h3[normalize-space()='Motorola AutoEditado']"));

    public static final Target BOTON_ELIMINAR_CATEGORIA = Target.the("Botón eliminar categoría")
            .located(By.xpath("//h3[normalize-space()='Motorola AutoEditado']/ancestor::div[contains(@class,'card-option')]//button[contains(@class,'btn-danger')]"));

    public static final Target MENSAJE_EXITO = Target.the("Mensaje de eliminación exitosa")
            .located(By.xpath("//div[contains(@class, 'alert-success') and contains(., 'eliminada')]"));

    public static final Target MENSAJE_EXITO_ALTERNATIVO = Target.the("Mensaje alternativo de éxito")
            .located(By.xpath("//*[contains(text(), 'eliminada') or contains(text(), 'Eliminada') or contains(text(), 'correctamente')]"));
}