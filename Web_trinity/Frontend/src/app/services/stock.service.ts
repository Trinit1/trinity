import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseUrl = 'http://localhost:3000/api';
  private stockUrl = `${this.baseUrl}/stock`;
  private productUrl = `${this.baseUrl}/products`;
  private categoryUrl = `${this.baseUrl}/categories`;

  constructor(private http: HttpClient) {}

  // 📦 CATEGORÍAS
  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.categoryUrl, categoria);
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(`${this.categoryUrl}/${id}`, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  // 📊 STOCK GENERAL
  getResumenStock(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen`);
  }

  getResumenPorCategoria(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen/categoria`);
  }

  getResumenPorProducto(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen/producto`);
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.stockUrl}/productos`);
  }

  getProductosPorCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.productUrl}/categoria/${categoriaId}`);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.productUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
