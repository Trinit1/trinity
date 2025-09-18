import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  obtenerCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  editarCategoria(id: number, categoria: { name: string, description?: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, categoria);
}

}