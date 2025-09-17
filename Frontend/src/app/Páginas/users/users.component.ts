import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Proveedor, ProviderService } from '../../services/provider.service';

interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
  ip?: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor, NgIf],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usuarios: Usuario[] = [];
  rolesDisponibles: string[] = ['Admin', 'Editor', 'Encargado', 'Vendedor'];

  nuevoUsuario: Usuario = {
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  usuarioEditando: Usuario | null = null;
  paginaActual: number = 1;
  usuariosPorPagina: number = 5;
  filtro: string = '';

  proveedores: Proveedor[] = [];
  nuevoProveedor: Proveedor = { nombre: '', email: '', telefono: '' };
  paginaProveedor: number = 1;
  proveedoresPorPagina: number = 5;

  constructor(
    private userService: UserService,
    private providerService: ProviderService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProveedores();
  }

  get usuariosFiltrados(): Usuario[] {
    if (!this.filtro.trim()) return this.usuarios;
    const f = this.filtro.toLowerCase();
    return this.usuarios.filter(u =>
      u.nombre.toLowerCase().includes(f) ||
      u.email.toLowerCase().includes(f) ||
      u.rol.toLowerCase().includes(f)
    );
  }

  get usuariosPaginados(): Usuario[] {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    return this.usuariosFiltrados.slice(inicio, inicio + this.usuariosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.usuariosFiltrados.length / this.usuariosPorPagina);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  cargarUsuarios(): void {
    this.userService.obtenerUsuarios().subscribe({
      next: (res: Usuario[]) => {
        this.usuarios = res;
      },
      error: (err: any) => console.error('Error al cargar usuarios:', err)
    });
  }

  agregarUsuario(): void {
    const { nombre, email, password, rol } = this.nuevoUsuario;
    if (!nombre.trim() || !email.trim() || !password || !rol) return;

    this.userService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.nuevoUsuario = { nombre: '', email: '', password: '', rol: '' };
        this.cargarUsuarios();
      },
      error: (err: any) => console.error('Error al crear usuario:', err)
    });
  }

  iniciarEdicion(usuario: Usuario): void {
    this.usuarioEditando = { ...usuario };
  }

  guardarEdicion(): void {
    if (!this.usuarioEditando?.id) return;

    this.userService.actualizarUsuario(this.usuarioEditando.id, this.usuarioEditando).subscribe({
      next: () => {
        this.usuarioEditando = null;
        this.cargarUsuarios();
      },
      error: (err: any) => console.error('Error al actualizar usuario:', err)
    });
  }

  cancelarEdicion(): void {
    this.usuarioEditando = null;
  }

  eliminarUsuario(id?: number): void {
    if (!id || !confirm('¿Eliminar este usuario?')) return;

    this.userService.eliminarUsuario(id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err: any) => console.error('Error al eliminar usuario:', err)
    });
  }

  cargarProveedores(): void {
    this.providerService.obtenerProveedores().subscribe({
      next: (res: Proveedor[]) => this.proveedores = res,
      error: (err: any) => console.error('Error al cargar proveedores:', err)
    });
  }

  agregarProveedor(): void {
    const { nombre } = this.nuevoProveedor;
    if (!nombre.trim()) return;

    this.providerService.crearProveedor(this.nuevoProveedor).subscribe({
      next: () => {
        this.nuevoProveedor = { nombre: '', email: '', telefono: '' };
        this.cargarProveedores();
      },
      error: (err: any) => console.error('Error al agregar proveedor:', err)
    });
  }

  eliminarProveedor(id?: number): void {
    if (!id || !confirm('¿Eliminar este proveedor?')) return;

    this.providerService.eliminarProveedor(id).subscribe({
      next: () => this.cargarProveedores(),
      error: (err: any) => console.error('Error al eliminar proveedor:', err)
    });
  }

  proveedoresPaginados(): Proveedor[] {
    const inicio = (this.paginaProveedor - 1) * this.proveedoresPorPagina;
    return this.proveedores.slice(inicio, inicio + this.proveedoresPorPagina);
  }

  get totalPaginasProveedor(): number {
    return Math.ceil(this.proveedores.length / this.proveedoresPorPagina);
  }

  cambiarPaginaProveedor(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginasProveedor) {
      this.paginaProveedor = nuevaPagina;
    }
  }

  editarProveedor(proveedor: Proveedor): void {
  
  }
}
