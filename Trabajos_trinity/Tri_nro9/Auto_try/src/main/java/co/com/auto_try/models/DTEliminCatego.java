package co.com.auto_try.models;

import io.cucumber.java.DataTableType;
import java.util.Map;

public class DTEliminCatego {

    @DataTableType
    public EliminCatego defineEliminCatego(Map<String, String> entry) {
        return new EliminCatego(
                entry.get("ElNombreCatego")
        );
    }
}