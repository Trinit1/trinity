import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private apiUrl = 'http://localhost:3000/api/movements';

  constructor(private http: HttpClient) {}

  obtenerMovimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  registrarMovimiento(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
