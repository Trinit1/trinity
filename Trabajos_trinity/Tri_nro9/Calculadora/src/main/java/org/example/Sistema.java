package org.example;
import java.util.Scanner;

public class Sistema {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("CALCULADORA BÁSICA");

        System.out.print("Ingresa el primer número: ");
        int numero1 = scanner.nextInt();

        System.out.print("Ingresa el segundo número: ");
        int numero2 = scanner.nextInt();

        System.out.print("Ingresa el tercer número: ");
        int numero3 = scanner.nextInt();

        int suma = numero1 + numero2 + numero3;
        double promedio = suma / 3.0;

        int mayor = numero1;
        if (numero2 > mayor) {
            mayor = numero2;
        }
        if (numero3 > mayor) {
            mayor = numero3;
        }

        System.out.println("RESULTADOS:");
        System.out.println("Suma: " + suma);
        System.out.println("Promedio: " + promedio);
        System.out.println("Número mayor: " + mayor);

        scanner.close();
    }
}
