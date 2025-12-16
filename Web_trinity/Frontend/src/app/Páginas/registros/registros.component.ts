import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovementsService, Movements } from '../../services/movements.service';
import { ProductService, Product } from '../../services/product.service'; // Cambia a ProductService

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})
export class RegistrosComponent implements OnInit {
  // 📝 Datos del formulario
  movimiento = {
    tipo_movimiento: '',
    producto_nombre: '',
    producto_id: null as number | null,
    cantidad: null as number | null,
    fecha: this.getCurrentDate(),
    hora: this.getCurrentTime(),
    nota: '',
    responsable: ''
  };

  // 📋 Listas
  movimientos: Movements[] = [];
  productos: Product[] = [];
  
  // 🎯 Variables para el select
  productoSeleccionadoId: number | null = null;
  productoNombrePersonalizado: string = '';
  
  // ✏️ Control de edición
  idEditando: number | null = null;
  cargando = false;
  errorMensaje = '';

  // 🔗 Inyectar servicios
  constructor(
    private movementsService: MovementsService,
    private productService: ProductService  // Cambia a ProductService
  ) {}

  // 🚀 Inicializar componente
  ngOnInit(): void {
    this.cargarMovimientos();
    this.cargarProductos();
  }

  // 📅 Obtener fecha actual
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // ⏰ Obtener hora actual
  getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  // 🔄 Cargar productos para el selector
  cargarProductos() {
    this.productService.getAll().subscribe({  // Cambia a getAll()
      next: (data: Product[]) => {
        this.productos = data;
        console.log(`✅ Cargados ${data.length} productos`);
      },
      error: (err: any) => {
        console.error('Error al cargar productos:', err);
        // Datos de ejemplo SIN stock (o usa quantity)
        this.productos = [
  { id: 1, name: 'Laptop Dell', quantity: 15, category_id: 1 },
  { id: 2, name: 'Mouse Logitech', quantity: 30, category_id: 1 },
  { id: 3, name: 'Teclado Mecánico', quantity: 8, category_id: 1 }
];
      }
    });
  }

  // 🔄 Cargar movimientos
  cargarMovimientos() {
    this.cargando = true;
    this.movementsService.getMovimientos().subscribe({
      next: (data: Movements[]) => {
        this.movimientos = data;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar movimientos:', err);
        this.errorMensaje = 'Error al cargar movimientos';
        this.cargando = false;
      }
    });
  }

  // 🎯 Cuando se selecciona un producto del dropdown
  onProductoSeleccionado(event: any) {
    const id = event.target.value;
    this.productoSeleccionadoId = id ? parseInt(id) : null;
    
    if (this.productoSeleccionadoId && this.productoSeleccionadoId !== 0) {
      const producto = this.productos.find(p => p.id === this.productoSeleccionadoId);
      if (producto && producto.id) {  // Verifica que id no sea undefined
        this.movimiento.producto_nombre = producto.name;
        this.movimiento.producto_id = producto.id;  // Ahora sabemos que no es undefined
        this.productoNombrePersonalizado = '';
      }
    } else if (this.productoSeleccionadoId === 0) {
      this.movimiento.producto_id = null;
      this.movimiento.producto_nombre = this.productoNombrePersonalizado;
    } else {
      this.movimiento.producto_nombre = '';
      this.movimiento.producto_id = null;
    }
  }

  // 📤 Enviar formulario
  onSubmit() {
    console.log('Datos a enviar:', this.movimiento);
    
    // ✅ Validación
    if (!this.movimiento.tipo_movimiento || !this.movimiento.cantidad || 
        !this.movimiento.fecha || !this.movimiento.hora || !this.movimiento.responsable) {
      alert('❌ Complete los campos requeridos (*)');
      return;
    }

    // ✅ Validar producto
    if (!this.productoSeleccionadoId && !this.productoNombrePersonalizado) {
      alert('❌ Seleccione o escriba un producto');
      return;
    }

    // ✅ Si es "Otro producto"
    if (this.productoSeleccionadoId === 0) {
      this.movimiento.producto_nombre = this.productoNombrePersonalizado;
      this.movimiento.producto_id = null;
    }

    if (!this.movimiento.producto_nombre) {
      alert('❌ El nombre del producto es requerido');
      return;
    }

    if (this.movimiento.cantidad && this.movimiento.cantidad <= 0) {
      alert('❌ La cantidad debe ser mayor a 0');
      return;
    }

    // ✏️ MODO EDICIÓN
    if (this.idEditando !== null) {
      this.movementsService.actualizarMovimiento(
        this.idEditando, 
        this.movimiento as Movements
      ).subscribe({
        next: (response: any) => {
          alert('✅ Movimiento actualizado');
          this.resetForm();
          this.cargarMovimientos();
        },
        error: (err: any) => {
          console.error('Error:', err);
          alert('❌ Error: ' + (err.error?.mensaje || err.message));
        }
      });
      return;
    }

    // ➕ MODO CREACIÓN
    this.movementsService.crearMovimiento(this.movimiento as Movements).subscribe({
      next: (response: any) => {
        alert('✅ Movimiento registrado');
        this.resetForm();
        this.cargarMovimientos();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('❌ Error: ' + (err.error?.mensaje || err.message));
      }
    });
  }

  // ✏️ Editar movimiento
  editarMovimiento(movimiento: Movements) {
    this.movimiento = {
      tipo_movimiento: movimiento.tipo_movimiento,
      producto_nombre: movimiento.producto_nombre,
      producto_id: (movimiento as any).producto_id || null,
      cantidad: movimiento.cantidad,
      fecha: movimiento.fecha,
      hora: movimiento.hora,
      nota: movimiento.nota || '',
      responsable: movimiento.responsable
    };
    
    // Configurar el select
    if (this.movimiento.producto_id) {
      this.productoSeleccionadoId = this.movimiento.producto_id;
      this.productoNombrePersonalizado = '';
    } else {
      this.productoSeleccionadoId = 0;
      this.productoNombrePersonalizado = this.movimiento.producto_nombre;
    }
    
    this.idEditando = movimiento.id!;
    
    setTimeout(() => {
      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  // 🗑️ Eliminar movimiento
  eliminarMovimiento(id?: number) {
    if (!id) return;

    if (!confirm('⚠️ ¿Seguro que desea eliminar este movimiento?')) return;

    this.movementsService.eliminarMovimiento(id).subscribe({
      next: (response: any) => {
        alert('✅ Movimiento eliminado');
        this.cargarMovimientos();
      },
      error: (err: any) => {
        console.error('Error:', err);
        alert('❌ Error: ' + (err.error?.mensaje || err.message));
      }
    });
  }

  // ↩️ Cancelar edición
  cancelarEdicion() {
    this.resetForm();
  }

  // 🧹 Reiniciar formulario
  resetForm() {
    this.movimiento = {
      tipo_movimiento: '',
      producto_nombre: '',
      producto_id: null,
      cantidad: null,
      fecha: this.getCurrentDate(),
      hora: this.getCurrentTime(),
      nota: '',
      responsable: ''
    };
    this.productoSeleccionadoId = null;
    this.productoNombrePersonalizado = '';
    this.idEditando = null;
    this.errorMensaje = '';
  }

  // 🎨 Obtener clase CSS según tipo de movimiento
  getTipoClass(tipo: string): string {
    switch(tipo) {
      case 'entrada': return 'badge bg-success';
      case 'salida': return 'badge bg-danger';
      case 'devolucion': return 'badge bg-warning text-dark';
      default: return 'badge bg-secondary';
    }
  }

  // 📝 Obtener texto legible para tipo de movimiento
  getTipoTexto(tipo: string): string {
    switch(tipo) {
      case 'entrada': return 'Entrada';
      case 'salida': return 'Salida';
      case 'devolucion': return 'Devolución';
      default: return tipo;
    }
  }

  // 🔢 Formatear cantidad (color rojo si es baja)
  getCantidadClass(cantidad: number): string {
    return cantidad < 5 ? 'text-danger fw-bold' : '';
  }
}