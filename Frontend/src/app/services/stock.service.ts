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

  // Crear una categoría (con imagen)
  crearCategoria(formData: FormData): Observable<any> {
    return this.http.post(this.categoryUrl, formData);
  }

  // Actualizar una categoría (con imagen)
  actualizarCategoria(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.categoryUrl}/${id}`, formData);
  }

  // Eliminar categoría
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }

  // Obtener todas las categorías
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);
  }

  // 📊 STOCK GENERAL

  // Resumen completo
  getResumenStock(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen`);
  }

  // Total de productos
  getTotalProductos(): Observable<number> {
    return this.http.get<number>(`${this.stockUrl}/total`);
  }

  // Categorías con stock bajo
  getCategoriasConStockBajo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockUrl}/resumen/stock-bajo`);
  }

  // Resumen por categoría
  getResumenPorCategoria(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen/categoria`);
  }

  // Resumen por producto
  getResumenPorProducto(): Observable<any> {
    return this.http.get(`${this.stockUrl}/resumen/producto`);
  }

  // Productos más vendidos
  getProductosMasVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockUrl}/resumen/productos-mas-vendidos`);
  }

  getProductosMenosVendidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.stockUrl}/resumen/productos-menos-vendidos`);
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.stockUrl}/productos`);
  }

  getProductosPorCategoria(categoriaId: number): Observable<any> {
    return this.http.get(`${this.stockUrl}/productos/categoria/${categoriaId}`);
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.productUrl}/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
