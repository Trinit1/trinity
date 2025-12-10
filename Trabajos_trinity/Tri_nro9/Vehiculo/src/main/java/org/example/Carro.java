package org.example;

public class Carro extends Vehiculo {

    @Override
    public void arrancar() {
        System.out.println("El carro ha arrancado.");
    }
    @Override
    public void combustible(){
        System.out.println("El carro se está quedando sin combustible.");
    }
    @Override
    public void detener(){
        System.out.println("El carro se ha detenido.");
    }
}
