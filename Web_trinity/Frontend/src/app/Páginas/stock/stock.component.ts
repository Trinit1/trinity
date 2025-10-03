import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, FormsModule, HttpClientModule],
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  resumen: any[] = [];
  resumenPorCategoria: any;
  resumenPorProducto: any;
  productos: any;
  categorias: any;

  // Formulario
  nombreCategoria: string = '';
  descripcionCategoria: string = '';
  imagenCategoria: string = '';
  mensajeExitoCategoria: string = '';
  mensajeErrorCategoria: string = '';

  editandoCategoria: boolean = false;
  categoriaEditandoId: number | null = null;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
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
    this.resetMensajes();

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
        this.resetFormulario();
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = 'Error al agregar la categoría.';
      }
    });
  }

  prepararEdicion(item: any) {
    this.editandoCategoria = true;
    this.categoriaEditandoId = item.id;
    this.nombreCategoria = item.categoria;
    this.descripcionCategoria = item.descripcion || '';
    this.imagenCategoria = item.imageUrl || '';
  }

  cancelarEdicion() {
    this.resetFormulario();
    this.editandoCategoria = false;
    this.categoriaEditandoId = null;
  }

  actualizarCategoria() {
    this.resetMensajes();

    if (!this.nombreCategoria || !this.descripcionCategoria || !this.categoriaEditandoId) {
      this.mensajeErrorCategoria = 'Completa todos los campos.';
      return;
    }

    const categoriaActualizada = {
      name: this.nombreCategoria,
      description: this.descripcionCategoria,
      imageUrl: this.imagenCategoria || null
    };

    this.stockService.actualizarCategoria(this.categoriaEditandoId, categoriaActualizada).subscribe({
      next: () => {
        this.mensajeExitoCategoria = '¡Categoría actualizada correctamente!';
        this.resetFormulario();
        this.editandoCategoria = false;
        this.categoriaEditandoId = null;
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = 'Error al actualizar la categoría.';
      }
    });
  }

  eliminarCategoria(id: number) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;

    this.stockService.eliminarCategoria(id).subscribe({
      next: () => {
        this.mensajeExitoCategoria = 'Categoría eliminada correctamente.';
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = 'No se pudo eliminar. Puede tener productos asociados.';
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

  private resetFormulario() {
    this.nombreCategoria = '';
    this.descripcionCategoria = '';
    this.imagenCategoria = '';
  }

  private resetMensajes() {
    this.mensajeExitoCategoria = '';
    this.mensajeErrorCategoria = '';
  }
}
