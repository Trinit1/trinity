package org.example;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Libro[] biblioteca = new Libro[5];

        System.out.println("BIENVENIDO A LA BIBLIOTECA DIGITAL");
        System.out.println("Por favor, ingresa los datos de 5 libros:");
        System.out.println();

        for (int i = 0; i < 5; i++) {
            System.out.println("Libro #" + (i + 1));

            System.out.print("Ingresa el título: ");
            String titulo = scanner.nextLine();

            System.out.print("Ingresa el autor: ");
            String autor = scanner.nextLine();

            System.out.print("Ingresa el año de publicación: ");
            int anio = scanner.nextInt();
            scanner.nextLine();

            System.out.println();

            biblioteca[i] = new Libro(titulo, autor, anio);
        }

        System.out.println("LISTA COMPLETA DE LIBROS:");
        System.out.println("===================================");

        for (Libro libro : biblioteca) {
            libro.mostrarInformacion();
        }

        System.out.println("BUSCAR LIBRO POR TÍTULO");
        System.out.print("Ingresa el título a buscar: ");
        String tituloBuscado = scanner.nextLine();

        boolean encontrado = false;

        for (Libro libro : biblioteca) {
            if (libro.getTitulo().equalsIgnoreCase(tituloBuscado)) {
                System.out.println("LIBRO ENCONTRADO:");
                libro.mostrarInformacion();
                encontrado = true;
                break;
            }
        }

        if (!encontrado) {
            System.out.println("No se encontró ningún libro con el título: " + tituloBuscado);
        }

        System.out.println("BUSCANDO EL LIBRO MÁS ANTIGUO...");

        if (biblioteca.length > 0) {
            Libro libroMasAntiguo = biblioteca[0];

            for (Libro libro : biblioteca) {
                if (libro.getAnioPublicacion() < libroMasAntiguo.getAnioPublicacion()) {
                    libroMasAntiguo = libro;
                }
            }

            System.out.println("EL LIBRO MÁS ANTIGUO ES:");
            libroMasAntiguo.mostrarInformacion();
        }

        scanner.close();
        System.out.println("¡Gracias por usar la Biblioteca Digital!");
    }
}