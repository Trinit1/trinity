package org.example;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args){

        Vehiculo[] garaje = new Vehiculo[3];

        garaje[0] = new Carro();
        garaje[1] = new Moto();
        garaje[2] = new Bici();

        for (Vehiculo vehiculo: garaje){
            vehiculo.arrancar();
            vehiculo.combustible();
            vehiculo.detener();
            System.out.println("---------");
        }
    }
}