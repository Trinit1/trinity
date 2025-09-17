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

  // Formulario categoría
  nombreCategoria = '';
  descripcionCategoria = '';
  imagenSeleccionada: File | null = null;
  imagenPreview: string | null = null;

  // Estado
  mensajeExitoCategoria = '';
  mensajeErrorCategoria = '';
  editandoCategoria = false;
  categoriaEditandoId: number | null = null;

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 8;

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
    if (!input.files?.length) return;

    this.imagenSeleccionada = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.imagenPreview = reader.result as string;
    reader.readAsDataURL(this.imagenSeleccionada);
  }

  agregarCategoria(): void {
    this.resetMensajes();

    if (!this.nombreCategoria.trim() || !this.descripcionCategoria.trim()) {
      this.mensajeErrorCategoria = '⚠️ Completa todos los campos.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.nombreCategoria.trim());
    formData.append('description', this.descripcionCategoria.trim());
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

  prepararEdicion(item: any): void {
    this.editandoCategoria = true;
    this.categoriaEditandoId = item.id;
    this.nombreCategoria = item.name || item.categoria || '';
    this.descripcionCategoria = item.description || item.descripcion || '';
    this.imagenPreview = item.imageUrl ? 'http://localhost:3000' + item.imageUrl : null;
    this.imagenSeleccionada = null;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
    this.editandoCategoria = false;
    this.categoriaEditandoId = null;
  }

  actualizarCategoria(): void {
    this.resetMensajes();

    if (!this.nombreCategoria.trim() || !this.descripcionCategoria.trim() || !this.categoriaEditandoId) {
      this.mensajeErrorCategoria = '⚠️ Completa todos los campos.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.nombreCategoria.trim());
    formData.append('description', this.descripcionCategoria.trim());
    if (this.imagenSeleccionada) {
      formData.append('image', this.imagenSeleccionada);
    }

    this.stockService.actualizarCategoria(this.categoriaEditandoId, formData).subscribe({
      next: () => {
        this.mensajeExitoCategoria = '✅ ¡Categoría actualizada correctamente!';
        this.resetFormulario();
        this.editandoCategoria = false;
        this.categoriaEditandoId = null;
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = '❌ Error al actualizar la categoría.';
      }
    });
  }

  eliminarCategoria(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;

    this.stockService.eliminarCategoria(id).subscribe({
      next: () => {
        this.mensajeExitoCategoria = '✅ Categoría eliminada correctamente.';
        this.cargarDatos();
      },
      error: () => {
        this.mensajeErrorCategoria = '❌ No se pudo eliminar. Puede tener productos asociados.';
      }
    });
  }

  resumenPaginado(): any[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.resumen.slice(inicio, inicio + this.itemsPorPagina);
  }

  cambiarPagina(delta: number): void {
    const total = this.totalPaginas();
    this.paginaActual = Math.max(1, Math.min(this.paginaActual + delta, total));
  }

  totalPaginas(): number {
    return Math.ceil(this.resumen.length / this.itemsPorPagina);
  }

  getImagen(nombre: string): string {
    const normalizado = nombre.toLowerCase();
    if (normalizado.includes('accesorio')) return '/accesorios.jfif';
    if (normalizado.includes('apple')) return '/iphone.png';
    if (normalizado.includes('computo') || normalizado.includes('cómputo')) return '/dComputo.png';
    if (normalizado.includes('componente')) return '/componentes.jfif';
    if (normalizado.includes('*')) return '/img1.png';
    return '/dComputo.png';
  }

  reemplazarImagenPorDefecto(item: any): void {
    item.imageUrl = '/itachi.png';
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
