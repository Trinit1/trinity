import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, NgIf, NgFor, RouterLink]
})
export class HomeComponent implements OnInit {
  categorias: any[] = [];
  resumen: any[] = [];
  alertasStockBajo: any[] = [];

  totalProductos = 0;
  masVendidos: any[] = [];
  menosVendidos: any[] = [];
  maxVendidos = 1;

  currentPage = 1;
  itemsPerPage = 4;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarAlertasStockBajo();
  }

  cargarDatos(): void {
    // 📦 Cargar categorías
    this.stockService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.map((cat: any) => ({
          ...cat,
          imageUrl: cat.imageUrl || cat.imagen || '/generico.png'
        }));
      },
      error: (err) => console.error('❌ Error cargando categorías:', err)
    });

    // 🔢 Total productos
    this.stockService.getTotalProductos().subscribe({
      next: (total) => (this.totalProductos = total),
      error: (err) => console.error('❌ Error cargando total productos:', err)
    });

    // 📊 Resumen general
    this.stockService.getResumenStock().subscribe({
      next: (data) => {
        this.resumen = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('❌ Error cargando resumen de stock:', err)
    });

    // 📈 Productos más vendidos
    this.stockService.getProductosMasVendidos().subscribe({
      next: (data) => {
        this.masVendidos = data.map(p => ({
          ...p,
          nombre: p.name || p.nombre || 'Producto'
        }));
        this.maxVendidos = Math.max(...this.masVendidos.map(p => p.vendidos ?? 0), 1);
      },
      error: (err) => console.error('❌ Error cargando productos más vendidos:', err)
    });

    // 📉 Productos menos vendidos
    this.stockService.getProductosMenosVendidos().subscribe({
      next: (data) => {
        this.menosVendidos = data.map(p => ({
          ...p,
          nombre: p.name || p.nombre || 'Producto'
        }));
      },
      error: (err) => console.error('❌ Error cargando productos menos vendidos:', err)
    });
  }

  cargarAlertasStockBajo(): void {
    this.stockService.getCategoriasConStockBajo().subscribe({
      next: (data) => {
        this.alertasStockBajo = data.filter(cat => cat.esta_bajo);
      },
      error: (err) => console.error('❌ Error cargando alertas de stock bajo:', err)
    });
  }

  // 🔄 Paginación
  categoriasPaginadas(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.categorias.slice(start, start + this.itemsPerPage);
  }

  totalPaginas(): number {
    return Math.ceil(this.categorias.length / this.itemsPerPage);
  }

  obtenerPaginas(): number[] {
    return Array.from({ length: this.totalPaginas() }, (_, i) => i + 1);
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas()) {
      this.currentPage = pagina;
    }
  }

  // ✅ 🔧 Esta función estaba mal ubicada
  getRutaImagen(categoria: any): string {
    return categoria.imageUrl?.startsWith('/uploads')
      ? 'http://localhost:3000' + categoria.imageUrl
      : categoria.imageUrl;
  }

  reemplazarImagenPorDefecto(categoria: any): void {
  categoria.imageUrl = '/dComputo.png';
}
}
