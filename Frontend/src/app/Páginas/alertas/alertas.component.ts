import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasService, Notificacion } from '../../services/alertas.service';
import { interval, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit, OnDestroy {
  notificaciones: Notificacion[] = [];
  filtroTipo = '';
  filtroDesde: string = '';
  filtroHasta: string = '';
  paginaActual = 1;
  itemsPorPagina = 6;
  ordenFecha: 'desc' | 'asc' = 'desc';
  ordenTipo: 'asc' | 'desc' = 'asc';
  private intervaloSub!: Subscription;

  constructor(private alertasService: AlertasService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
    this.intervaloSub = interval(10000).subscribe(() => this.cargarNotificaciones());
  }

  ngOnDestroy(): void {
    if (this.intervaloSub) this.intervaloSub.unsubscribe();
  }

  cargarNotificaciones(): void {
    this.alertasService.getNotificaciones().subscribe({
      next: (data) => (this.notificaciones = data),
      error: (err) => console.error('Error al cargar notificaciones:', err)
    });
  }

  getIconoClase(tipo: string): string {
    switch (tipo) {
      case 'success': return 'bi bi-check-circle-fill text-success';
      case 'warning': return 'bi bi-exclamation-triangle-fill text-warning';
      case 'error': return 'bi bi-x-circle-fill text-danger';
      default: return 'bi bi-info-circle-fill text-info';
    }
  }

  extraerResponsable(mensaje: string): string | null {
    const match = mensaje.match(/responsable\s*:\s*(.+)$/i);
    return match ? match[1] : null;
  }

  get notificacionesFiltradas(): Notificacion[] {
    let filtradas = [...this.notificaciones];

    if (this.filtroTipo) {
      filtradas = filtradas.filter(n => n.tipo === this.filtroTipo);
    }

    if (this.filtroDesde) {
      filtradas = filtradas.filter(n => new Date(n.createdAt || '') >= new Date(this.filtroDesde));
    }

    if (this.filtroHasta) {
      filtradas = filtradas.filter(n => new Date(n.createdAt || '') <= new Date(this.filtroHasta));
    }

    filtradas = filtradas.sort((a, b) => {
      const tipoA = a.tipo.toLowerCase();
      const tipoB = b.tipo.toLowerCase();
      return this.ordenTipo === 'asc' ? tipoA.localeCompare(tipoB) : tipoB.localeCompare(tipoA);
    });

    filtradas = filtradas.sort((a, b) => {
      const fechaA = new Date(a.createdAt || '').getTime();
      const fechaB = new Date(b.createdAt || '').getTime();
      return this.ordenFecha === 'desc' ? fechaB - fechaA : fechaA - fechaB;
    });

    return filtradas;
  }

  get totalPaginas(): number {
    return Math.ceil(this.notificacionesFiltradas.length / this.itemsPorPagina);
  }

  get notificacionesPaginadas(): Notificacion[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.notificacionesFiltradas.slice(inicio, inicio + this.itemsPorPagina);
  }

  cambiarPagina(delta: number): void {
    this.paginaActual = Math.max(1, Math.min(this.paginaActual + delta, this.totalPaginas));
  }

  resetFiltros(): void {
    this.filtroTipo = '';
    this.filtroDesde = '';
    this.filtroHasta = '';
    this.paginaActual = 1;
  }
}

