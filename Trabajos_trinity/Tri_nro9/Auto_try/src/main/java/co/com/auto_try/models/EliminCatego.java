package co.com.auto_try.models;

public class EliminCatego {

    private String ElNombreCatego;

    public EliminCatego(String ElNombreCatego) {
        this.ElNombreCatego = ElNombreCatego;
    }

    public String getElNombreCatego() {
        return ElNombreCatego;
    }

    public void setElNombreCatego(String ElNombreCatego) {
        this.ElNombreCatego = ElNombreCatego;
    }

    @Override
    public String toString() {
        return "EliminCatego{" +
                "ElNombreCatego='" + ElNombreCatego + '\'' +
                '}';
    }
}