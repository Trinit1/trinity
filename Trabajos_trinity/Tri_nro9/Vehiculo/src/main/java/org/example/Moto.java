package org.example;

public class Moto extends Vehiculo {

    @Override
    public void arrancar() {
        System.out.println("La mato ha arrancado.");
    }
    @Override
    public  void combustible() {
        System.out.println("La moto tiene poco combustible");
    }
    @Override
    public void detener() {
        System.out.println("La moto se ha detenido.");

    }
}
