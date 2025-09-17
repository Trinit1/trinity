import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  productos: any[] = [];
  categorias: any[] = [];
  cargando = false;

  salida = {
    productoId: '',  
    cantidad: 1,
    fecha: '',
    hora: '',
    nota: '',
    responsable: ''
  };

  nuevoProducto = {
    name: '',
    quantity: 1,
    category_id: 0,
    imageUrl: '',
    responsable: ''
  };

  mensajeToast = '';
  mostrarToast = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productService.getAll().subscribe({
      next: (data) => this.productos = Array.isArray(data) ? data : [],
      error: (err) => console.error('❌ Error cargando productos:', err)
    });
  }

  obtenerCategorias(): void {
    this.productService.getCategorias().subscribe({
      next: (data) => this.categorias = Array.isArray(data) ? data : [],
      error: (err) => console.error('❌ Error cargando categorías:', err)
    });
  }

  registrarSalida(): void {
    const producto = this.productoSeleccionado;
    const cantidadSolicitada = Number(this.salida.cantidad);
    const cantidadDisponible = Number(producto?.quantity || 0);

    if (!producto || !this.salida.fecha || !this.salida.hora || !this.salida.responsable) {
      this.mostrarMensaje('⚠️ Por favor completa todos los campos obligatorios.');
      return;
    }

    if (cantidadSolicitada <= 0 || cantidadSolicitada > cantidadDisponible) {
      this.mostrarMensaje('⚠️ Cantidad inválida o producto no disponible en stock.');
      return;
    }

    this.cargando = true;

    const productoActualizado = {
      ...producto,
      quantity: cantidadDisponible - cantidadSolicitada,
      vendidos: (Number(producto.vendidos) || 0) + cantidadSolicitada
    };

    this.productService.update(producto.id, productoActualizado).subscribe({
      next: () => {
        this.productService.registrarSalida(this.salida).subscribe({
          next: () => {
            this.productService.registrarNotificacion(
              `✅ Se registró una salida de ${cantidadSolicitada} unidad(es) de ${producto.name}. Responsable: ${this.salida.responsable}`,
              'success'
            ).subscribe();

            this.mostrarMensaje('✅ Salida registrada exitosamente.');
            this.obtenerProductos();
            this.resetFormulario();
            this.cargando = false;
          },
          error: (err) => {
            console.error('❌ Error registrando salida en la base de datos:', err);
            this.mostrarMensaje('❌ Error registrando salida en la base de datos.');
            this.cargando = false;
          }
        });
      },
      error: (err) => {
        console.error('❌ Error actualizando producto:', err);
        this.mostrarMensaje('❌ Error actualizando producto.');
        this.cargando = false;
      }
    });
  }

  crearProducto(): void {
    if (
      !this.nuevoProducto.name.trim() ||  // Mejor validar que no sea solo espacios
      this.nuevoProducto.quantity <= 0 ||
      this.nuevoProducto.category_id === null
    ) {
      this.mostrarMensaje('⚠️ Por favor completa todos los campos del nuevo producto.');
      return;
    }

    this.cargando = true;

    this.productService.create(this.nuevoProducto).subscribe({
      next: (productoCreado) => {
        this.productService.registrarNotificacion(
          `🆕 Producto creado: ${productoCreado.name} con ${productoCreado.quantity} unidades.`,
          'success'
        ).subscribe();

        this.mostrarMensaje(`✅ Producto "${productoCreado.name}" agregado correctamente.`);
        this.obtenerProductos();
        this.resetNuevoProducto();
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al crear el producto:', error);
        this.mostrarMensaje('❌ Error al agregar el producto.');
        this.cargando = false;
      }
    });
  }

  resetNuevoProducto(): void {
    this.nuevoProducto = {
      name: '',
      quantity: 1,
      category_id: 0,
      imageUrl: '',
      responsable: ''
    };
  }

  resetFormulario(): void {
    this.salida = {
      productoId: '',
      cantidad: 1,
      fecha: '',
      hora: '',
      nota: '',
      responsable: ''
    };
  }

  get productoSeleccionado() {
    // Convierte productoId a número para la búsqueda
    const id = Number(this.salida.productoId);
    return this.productos.find(p => p.id === id);
  }

  mostrarMensaje(mensaje: string): void {
    this.mensajeToast = mensaje;
    this.mostrarToast = true;
    setTimeout(() => {
      this.mostrarToast = false;
      this.mensajeToast = '';
    }, 3000);
  }
}
