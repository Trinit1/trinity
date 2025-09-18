import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión
  login(email: string, password: string) {
    return this.http.post<{ token: string, usuario: any }>(`${this.apiUrl}/login`, { email, password });
  }

  // Guardar token y usuario
  guardarSesion(token: string, usuario: any) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  // Obtener token
  obtenerToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Obtener usuario
  obtenerUsuario(): any {
    if (this.isBrowser()) {
      const usuario = localStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  // Cerrar sesión
  cerrarSesion() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    this.router.navigate(['/login']);
  }

  // Verificar si está autenticado
  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  // Método esperado por el AuthGuard
  isLoggedIn(): boolean {
    return this.estaAutenticado();
  }

  // Verifica si se está ejecutando en navegador (no en SSR o test)
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
