import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  rol: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL de tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users`);
  }

  // Crear nuevo usuario
  crearUsuario(usuario: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, usuario);
  }

  // Actualizar usuario
  actualizarUsuario(id: number, datos: Partial<Usuario>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, datos);
  }

  // Eliminar usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}