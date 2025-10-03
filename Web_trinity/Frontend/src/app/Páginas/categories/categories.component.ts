import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  resumen: any;
  resumenPorCategoria: any;
  resumenPorProducto: any;
  productos: any;
  categorias: any;

  // Nuevas propiedades para el formulario
  nombreCategoria: string = '';
  descripcionCategoria: string = '';
  imagenCategoria: string = '';

  mensajeExitoCategoria: string = '';
  mensajeErrorCategoria: string = '';

  constructor(private stockService: StockService) {}

  getImagen(nombre: string): string {
    const normalizado = nombre.toLowerCase();
    if (normalizado.includes('accesorio')) return '/accesorios.jfif';
    if (normalizado.includes('apple')) return '/iphone.png';
    if (normalizado.includes('cómputo')) return '/dComputo.png';
    if (normalizado.includes('componente')) return '/componentes.jfif';
    return '/generico.png';
  }

  ngOnInit(): void {
    this.stockService.getResumenStock().subscribe(data => {
      this.resumen = Array.isArray(data) ? data : [data];
    });
    this.stockService.getResumenPorCategoria().subscribe(data => {
      this.resumenPorCategoria = data;
    });
    this.stockService.getResumenPorProducto().subscribe(data => {
      this.resumenPorProducto = data;
    });
    this.stockService.getProductos().subscribe(data => {
      this.productos = data;
    });
    this.stockService.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  agregarCategoria() {
    this.mensajeExitoCategoria = '';
    this.mensajeErrorCategoria = '';

    if (!this.nombreCategoria || !this.descripcionCategoria) {
      this.mensajeErrorCategoria = 'Completa todos los campos.';
      return;
    }

    const nuevaCategoria = {
      name: this.nombreCategoria,
      description: this.descripcionCategoria,
      imageUrl: this.imagenCategoria || null
    };

    this.stockService.crearCategoria(nuevaCategoria).subscribe({
      next: () => {
        this.mensajeExitoCategoria = '¡Categoría agregada exitosamente!';
        this.nombreCategoria = '';
        this.descripcionCategoria = '';
        this.imagenCategoria = '';

        this.stockService.getCategorias().subscribe(data => {
          this.categorias = data;
        });
        this.stockService.getResumenStock().subscribe(data => {
          this.resumen = Array.isArray(data) ? data : [data];
        });
      },
      error: () => {
        this.mensajeErrorCategoria = 'Error al agregar la categoría.';
      }
    });
  }
}
