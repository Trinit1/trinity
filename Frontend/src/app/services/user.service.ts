import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, usuario);
  }

  actualizarUsuario(id: number, datos: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/users/${id}`, datos);
}

eliminarUsuario(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/users/${id}`);
}

}
