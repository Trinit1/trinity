package co.com.auto_try.runners;

import io.cucumber.junit.CucumberOptions;
import net.serenitybdd.cucumber.CucumberWithSerenity;
import org.junit.runner.RunWith;

@RunWith(CucumberWithSerenity.class)
@CucumberOptions(
        features = "src/test/resources/features/Auto_EliminCatego.feature",
        glue = {"co.com.auto_try.stepsdefinitions",
                "co.com.auto_try.utils.hooks",
                "co.com.auto_try.models"
        },
        snippets = CucumberOptions.SnippetType.CAMELCASE
)
public class AutenRunnEliminCatego {
}