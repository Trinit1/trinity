import { Component, OnInit } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [FormsModule, RouterModule, NgIf, NgFor]
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];

  nombre = '';
  categoriaId: number | null = null;
  cantidad: number | null = null;
  imagenUrl = '';

  mensajeExito = '';
  mensajeError = '';

  productoEditando: any = null;

  constructor(
    private axiosService: AxiosService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoryService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.mensajeError = 'Error al cargar las categorías.';
      }
    });
  }

  async obtenerProductos(): Promise<void> {
    try {
      this.productos = await this.axiosService.obtenerProductos();
    } catch (error) {
      console.error('Error al obtener productos:', error);
      this.mensajeError = 'No se pudieron cargar los productos.';
    }
  }

  async agregarProducto(): Promise<void> {
    if (this.productoEditando) return;

    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.nombre || this.categoriaId == null || this.cantidad == null) {
      this.mensajeError = 'Completa todos los campos.';
      return;
    }

    const nuevoProducto = {
      name: this.nombre,
      quantity: this.cantidad,
      category_id: this.categoriaId,
      imageUrl: this.imagenUrl || null
    };

    try {
      await this.axiosService.crearProducto(nuevoProducto);
      this.mensajeExito = '¡Producto agregado exitosamente!';
      await this.obtenerProductos();
      this.resetFormulario();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      this.mensajeError = 'Error al agregar el producto.';
    }
  }

  async actualizarProducto(): Promise<void> {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (!this.nombre || this.categoriaId == null || this.cantidad == null) {
      this.mensajeError = 'Completa todos los campos.';
      return;
    }

    const productoActualizado = {
      name: this.nombre,
      quantity: this.cantidad,
      category_id: this.categoriaId,
      imageUrl: this.imagenUrl || null
    };

    try {
      await this.axiosService.actualizarProducto(this.productoEditando.id, productoActualizado);
      this.mensajeExito = '¡Producto actualizado exitosamente!';
      await this.obtenerProductos();
      this.resetFormulario();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      this.mensajeError = 'Error al actualizar el producto.';
    }
  }

  cargarProducto(producto: any): void {
    this.productoEditando = producto;
    this.nombre = producto.name;
    this.categoriaId = producto.category_id;
    this.cantidad = producto.quantity;
    this.imagenUrl = producto.imageUrl || '';
    this.mensajeError = '';
    this.mensajeExito = '';
  }

  cancelarEdicion(): void {
    this.resetFormulario();
    this.mensajeExito = 'Edición cancelada.';
  }

  resetFormulario(): void {
    this.nombre = '';
    this.categoriaId = null;
    this.cantidad = null;
    this.imagenUrl = '';
    this.productoEditando = null;
  }

  getNombreCategoria(id: number | string): string {
    const cat = this.categorias.find(c => c.id == id);
    return cat ? cat.name : 'Sin nombre';
  }

  async removerProducto(producto: any): Promise<void> {
    try {
      await this.axiosService.eliminarProducto(producto.id);
      await this.obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      this.mensajeError = 'Error al eliminar el producto.';
    }
  }
}
