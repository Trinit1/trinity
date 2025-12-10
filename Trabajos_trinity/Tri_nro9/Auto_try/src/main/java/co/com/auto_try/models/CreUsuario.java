package co.com.auto_try.models;

public class CreUsuario {

    private String nombreCompUsu;
    private String nombreUsu;
    private String claveUsu;
    private String rolUsu;


    public CreUsuario() {
    }

    // Getters y Setters
    public String getNombreCompUsu() {
        return nombreCompUsu;
    }

    public void setNombreComUsu(String nombreCompUsu) {
        this.nombreCompUsu = nombreCompUsu;
    }

    public String getNombreUsu() {
        return nombreUsu;
    }

    public void setNombreUsu(String nombreUsu) {
        this.nombreUsu = nombreUsu;
    }

    public String getClaveUsu() {
        return claveUsu;
    }

    public void setClaveUsu(String claveUsu) {
        this.claveUsu = claveUsu;
    }

    public String getRolUsu() {
        return rolUsu;
    }

    public void setRolUsu(String rolUsu) {
        this.rolUsu = rolUsu;
    }
}