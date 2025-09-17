import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, FormsModule, NgFor, NgIf]
})
export class ProductsComponent implements OnInit {
  productos: Product[] = [];
  categorias: any[] = [];

  nombre = '';
  cantidad = 1;
  categoriaId: number | null = null;
  imagenUrl = '';
  productoEditando: Product | null = null;

  mensajeExito = '';
  mensajeError = '';

  terminoBusqueda = '';
  categoriaFiltro = '';

  currentPage = 1;
  readonly itemsPerPage = 9;

  mostrarFormulario = false;

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(): void {
    this.productService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error cargando productos', err)
    });
  }

  cargarCategorias(): void {
    this.categoryService.getCategorias().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('Error cargando categorías', err)
    });
  }

  nuevoProducto(): void {
    this.resetFormulario();
    this.mostrarFormulario = true;
  }

  cancelarEdicion(): void {
    this.resetFormulario();
    this.mostrarFormulario = false;
  }

  agregarProducto(): void {
    if (!this.nombre || !this.categoriaId || this.cantidad < 1) {
      this.mostrarError('❌ Completa todos los campos correctamente');
      return;
    }

    const nuevo: Product = {
      name: this.nombre,
      quantity: this.cantidad,
      category_id: this.categoriaId,
      imageUrl: this.imagenUrl
    };

    this.productService.create(nuevo).subscribe({
      next: () => {
        this.mostrarExito('✅ Producto agregado');
        this.resetFormulario();
        this.cargarProductos();
        this.mostrarFormulario = false;
      },
      error: () => this.mostrarError('❌ Error al agregar producto')
    });
  }

  actualizarProducto(): void {
    if (!this.productoEditando?.id) return;

    const actualizado: Product = {
      name: this.nombre,
      quantity: this.cantidad,
      category_id: this.categoriaId!,
      imageUrl: this.imagenUrl
    };

    this.productService.update(this.productoEditando.id, actualizado).subscribe({
      next: () => {
        this.mostrarExito('✅ Producto actualizado');
        this.resetFormulario();
        this.cargarProductos();
        this.mostrarFormulario = false;
      },
      error: () => this.mostrarError('❌ Error al actualizar producto')
    });
  }

  cargarProducto(producto: Product): void {
    this.productoEditando = producto;
    this.nombre = producto.name;
    this.cantidad = producto.quantity;
    this.categoriaId = producto.category_id;
    this.imagenUrl = producto.imageUrl || '';
    this.mostrarFormulario = true;
  }

  removerProducto(producto: Product): void {
    if (!producto.id || !confirm('¿Eliminar este producto?')) return;

    this.productService.delete(producto.id).subscribe({
      next: () => {
        this.mostrarExito('✅ Producto eliminado');
        this.cargarProductos();
      },
      error: () => this.mostrarError('❌ Error al eliminar producto')
    });
  }

  resetFormulario(): void {
    this.nombre = '';
    this.cantidad = 1;
    this.categoriaId = null;
    this.imagenUrl = '';
    this.productoEditando = null;
  }

  getNombreCategoria(id: number): string {
    const cat = this.categorias.find(c => c.id === id);
    return cat?.name || 'Sin categoría';
  }

  productosFiltrados(): Product[] {
    let filtrados = this.productos;

    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase();
      filtrados = filtrados.filter(p =>
        p.name.toLowerCase().includes(termino)
      );
    }

    if (this.categoriaFiltro) {
      filtrados = filtrados.filter(
        p => p.category_id === +this.categoriaFiltro
      );
    }

    return filtrados;
  }

  productosFiltradosPaginados(): Product[] {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    return this.productosFiltrados().slice(inicio, inicio + this.itemsPerPage);
  }

  cambiarPagina(delta: number): void {
    const total = this.totalPaginas();
    this.currentPage = Math.max(1, Math.min(this.currentPage + delta, total));
  }

  totalPaginas(): number {
    return Math.ceil(this.productosFiltrados().length / this.itemsPerPage);
  }

  private mostrarExito(mensaje: string): void {
    this.mensajeExito = mensaje;
    setTimeout(() => this.mensajeExito = '', 2000);
  }

  private mostrarError(mensaje: string): void {
    this.mensajeError = mensaje;
    setTimeout(() => this.mensajeError = '', 2000);
  }
}
