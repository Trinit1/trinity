import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-categoria',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule, RouterModule],
  templateUrl: './productos-categoria.component.html',
  styleUrls: ['./productos-categoria.component.css']
})
export class ProductosPorCategoriaComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];

  categoriaNombre = '';
  cargando = true;
  mensajeError = '';

  productoEditando: any = null;
  nombre = '';
  cantidad: number | null = null;
  imagenUrl = '';
  categoriaId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarProductosPorCategoria(Number(id));
    }
    this.cargarCategorias();
  }

  cargarProductosPorCategoria(id: number): void {
    this.cargando = true;
    this.stockService.getProductosPorCategoria(id).subscribe({
      next: (data) => {
        this.productos = data;
        this.categoriaNombre = data[0]?.categoria || 'Sin categoría';
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'Error al cargar los productos.';
        this.cargando = false;
      }
    });
  }

  cargarCategorias(): void {
    this.stockService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: () => {
        console.error('Error al cargar categorías');
      }
    });
  }

  iniciarEdicion(producto: any): void {
  this.productoEditando = producto;
  this.nombre = producto.name;
  this.cantidad = producto.quantity;
  this.imagenUrl = producto.imageUrl || '';
  this.categoriaId = producto.category_id || null;

  const categoria = this.categorias.find(cat => cat.id === this.categoriaId);
  this.categoriaNombre = categoria ? categoria.name : 'Sin categoría';
}


  cancelarEdicion(): void {
    this.resetFormulario();
  }

  actualizarProducto(): void {
    if (!this.productoEditando || !this.nombre || this.cantidad == null || this.categoriaId == null) {
      this.mensajeError = 'Completa todos los campos obligatorios.';
      return;
    }

    const productoActualizado = {
      id: this.productoEditando.id,
      name: this.nombre,
      quantity: this.cantidad,
      imageUrl: this.imagenUrl || null,
      category_id: this.categoriaId,
      categoria: this.obtenerNombreCategoria(this.categoriaId)
    };

    this.stockService.actualizarProducto(this.productoEditando.id, productoActualizado).subscribe({
      next: () => {
        this.productos = this.productos.map(p =>
          p.id === this.productoEditando.id ? productoActualizado : p
        );
        this.resetFormulario();
      },
      error: () => {
        this.mensajeError = 'No se pudo actualizar el producto.';
      }
    });
  }

  eliminarProducto(producto: any): void {
    const confirmacion = confirm(`¿Eliminar "${producto.name}"?`);
    if (!confirmacion) return;

    this.stockService.eliminarProducto(producto.id).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.id !== producto.id);
      },
      error: () => {
        this.mensajeError = 'No se pudo eliminar el producto.';
      }
    });
  }

  private obtenerNombreCategoria(id: number): string {
    const categoria = this.categorias.find(cat => cat.id === id);
    return categoria ? categoria.name : 'Sin categoría';
  }

  actualizarNombreCategoria(): void {
  const categoria = this.categorias.find(cat => cat.id === this.categoriaId);
  this.categoriaNombre = categoria ? categoria.name : 'Sin categoría';
  }


  private resetFormulario(): void {
    this.productoEditando = null;
    this.nombre = '';
    this.cantidad = null;
    this.imagenUrl = '';
    this.categoriaId = null;
    this.mensajeError = '';
  }
}
