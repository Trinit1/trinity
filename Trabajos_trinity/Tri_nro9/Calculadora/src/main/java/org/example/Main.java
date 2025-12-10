package org.example;
import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Holaa,estás usando la calculadora");
        System.out.println();
        System.out.print("¿Cuántos números quieres ingresar? ");
        int cantidad = scanner.nextInt();
        int[] numeros = new int[cantidad];
        int suma = 0;
        int mayor = numeros[0];

        for (int i = 0; i < cantidad; i++){
            System.out.println("Ingresa los numeros correspondientes " + (i + 1) + ": ");
            numeros[i] = scanner.nextInt();
            suma += numeros[i];

            if (numeros[i] > mayor){
                mayor = numeros[i];
            }
        }
        double promedio = (double) suma/ numeros.length;

        System.out.println("Resultados");
        System.out.println("Suma: " + suma);
        System.out.println("Promedio: " + promedio);
        System.out.println("El mayor entre los numeros: " + mayor);

        scanner.close();
    }
}