import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {
  private apiUrl = 'http://localhost:3000/api/products';

  async obtenerProductos() {
    const res = await axios.get(this.apiUrl);
    return res.data;
  }

  async crearProducto(producto: any) {
    const res = await axios.post(this.apiUrl, producto);
    return res.data;
  }

  async eliminarProducto(id: number) {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  async actualizarProducto(id: number, producto: any) {
    const res = await axios.put(`${this.apiUrl}/${id}`, producto);
    return res.data;
  }
}
