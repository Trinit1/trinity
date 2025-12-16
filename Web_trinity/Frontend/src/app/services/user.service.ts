// user.service.ts - versión corregida
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:3000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users`, this.httpOptions);
  }

  // Crear nuevo usuario
  crearUsuario(usuario: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
  }): Observable<any> {
    console.log('Enviando usuario:', usuario); // Para debug
    return this.http.post(`${this.apiUrl}/users`, usuario, this.httpOptions);
  }

  // Actualizar usuario
  actualizarUsuario(id: number, datos: Partial<Usuario>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, datos, this.httpOptions);
  }

  // Eliminar usuario
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, this.httpOptions);
  }
}