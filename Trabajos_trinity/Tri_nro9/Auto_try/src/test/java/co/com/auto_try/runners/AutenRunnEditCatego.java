package co.com.auto_try.runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/Auto_EditCatego.feature",
        glue = {"co.com.auto_try.stepsdefinitions", "co.com.auto_try.utils.hooks"},
        plugin = {"pretty", "html:target/cucumber-reports"},
        snippets = CucumberOptions.SnippetType.CAMELCASE
)
public class AutenRunnEditCatego {
}