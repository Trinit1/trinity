// users.component.ts - versión mejorada
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, Usuario } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  usuario = {
    nombre: '',
    email: '',
    password: '',
    rol: ''
  };

  usuarios: Usuario[] = [];
  idEditando: number | null = null;
  cargando = false;
  errorMensaje = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.errorMensaje = 'Error al cargar usuarios';
        this.cargando = false;
      }
    });
  }

crearUsuario() {

  // ➕ VALIDAR SOLO EN CREAR
  if (this.idEditando === null) {
    if (!this.usuario.nombre || !this.usuario.email ||
        !this.usuario.password || !this.usuario.rol) {
      alert('Todos los campos son requeridos');
      return;
    }
  }

  // ✏️ EDITAR
  if (this.idEditando !== null) {
    this.userService.actualizarUsuario(this.idEditando, {
      nombre: this.usuario.nombre,
      email: this.usuario.email,
      rol: this.usuario.rol
    }).subscribe({
      next: (response) => {
        alert(response.mensaje || 'Usuario actualizado correctamente');
        this.resetFormulario();
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.mensaje || 'Error al actualizar usuario');
      }
    });
    return;
  }

  // ➕ CREAR
  this.cargando = true;
  this.userService.crearUsuario(this.usuario).subscribe({
    next: (response) => {
      alert(response.mensaje || 'Usuario creado correctamente');
      this.resetFormulario();
      this.cargarUsuarios();
    },
    error: (err) => {
      console.error(err);
      this.errorMensaje = err.error?.mensaje || 'Error al crear usuario';
    },
    complete: () => {
      this.cargando = false;
    }
  });
}

  editarUsuario(usuario: Usuario) {
    this.usuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: '', // No mostrar la contraseña
      rol: usuario.rol
    };
    this.idEditando = usuario.id!;
    
    // Scroll al formulario
    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
  }

  eliminarUsuario(id?: number) {
    if (!id) return;

    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.userService.eliminarUsuario(id).subscribe({
      next: (response) => {
        alert(response.mensaje || 'Usuario eliminado correctamente');
        this.cargarUsuarios();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert(err.error?.mensaje || 'Error al eliminar usuario');
      }
    });
  }

  resetFormulario() {
    this.usuario = {
      nombre: '',
      email: '',
      password: '',
      rol: ''
    };
    this.idEditando = null;
    this.errorMensaje = '';
  }

  cancelarEdicion() {
    this.resetFormulario();
  }
}