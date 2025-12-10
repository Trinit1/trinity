package org.example;

public class Bici extends Vehiculo{

    @Override
    public void arrancar(){
        System.out.println("Estas pedaleando la bicicleta.");
    }
    @Override
    public void detener(){
        System.out.println("Esta frenando la bicicleta.");
    }
    @Override
    public void combustible(){
        System.out.println("Necesitas tomar agua para tener más energia no gasolina.");
    }

}
