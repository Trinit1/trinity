import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movements {
  id?: number;
  tipo_movimiento: string;
  producto_nombre: string;  // ← Cambiado de 'producto' a 'producto_nombre'
  producto_id?: number;     // ← Nuevo campo
  cantidad: number;
  fecha: string;
  hora: string;
  nota: string;
  responsable: string;
  producto_info?: {         // ← Información del producto relacionado
    id: number;
    nombre: string;
    stock: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  getMovimientos(): Observable<Movements[]> {
    return this.http.get<Movements[]>(`${this.apiUrl}/movements`);
  }

  // Crear nuevo movimiento
  crearMovimiento(movimiento: Movements): Observable<any> {
    return this.http.post(`${this.apiUrl}/movements`, movimiento);
  }

  // Actualizar movimiento
  actualizarMovimiento(id: number, movimiento: Movements): Observable<any> {
    return this.http.put(`${this.apiUrl}/movements/${id}`, movimiento);
  }

  // Eliminar movimiento
  eliminarMovimiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movements/${id}`);
  }
}