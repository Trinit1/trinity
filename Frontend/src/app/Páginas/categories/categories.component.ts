import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  resumen: any[] = [];
  resumenPorCategoria: any;
  resumenPorProducto: any;
  productos: any;
  categorias: any;

  nombreCategoria = '';
  descripcionCategoria = '';
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;

  mensajeExitoCategoria = '';
  mensajeErrorCategoria = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
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

  onImagenSeleccionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];

    if (!archivo) return;

    this.imagenSeleccionada = archivo;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenPreview = reader.result as string;
    };
    reader.readAsDataURL(archivo);
  }

  agregarCategoria(): void {
    this.resetMensajes();

    const nombre = this.nombreCategoria.trim();
    const descripcion = this.descripcionCategoria.trim();

    if (!nombre || !descripcion) {
      this.mensajeErrorCategoria = '⚠️ Completa todos los campos obligatorios.';
      return;
    }

    const formData = new FormData();
    formData.append('name', nombre);
    formData.append('description', descripcion);
    if (this.imagenSeleccionada) {
      formData.append('image', this.imagenSeleccionada);
    }

    this.stockService.crearCategoria(formData).subscribe({
      next: () => {
        this.mensajeExitoCategoria = '✅ ¡Categoría agregada exitosamente!';
        this.resetFormulario();
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = '❌ Error al agregar la categoría.';
      }
    });
  }

  getImagen(nombre: string): string {
    const normalizado = nombre.toLowerCase();
    if (normalizado.includes('accesorio')) return '/accesorios.jfif';
    if (normalizado.includes('apple')) return '/iphone.png';
    if (normalizado.includes('computo') || normalizado.includes('cómputo')) return '/dComputo.png';
    if (normalizado.includes('componente')) return '/componentes.jfif';
    return '/generico.png';
  }

  private resetFormulario(): void {
    this.nombreCategoria = '';
    this.descripcionCategoria = '';
    this.imagenSeleccionada = null;
    this.imagenPreview = null;
  }

  private resetMensajes(): void {
    this.mensajeExitoCategoria = '';
    this.mensajeErrorCategoria = '';
  }
}
