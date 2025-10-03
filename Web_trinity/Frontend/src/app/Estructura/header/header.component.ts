import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nombreUsuario: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const usuario = this.auth.obtenerUsuario();
      this.nombreUsuario = usuario?.nombre || '';
    }
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
  }

  estaAutenticado(): boolean {
    return this.auth.estaAutenticado();
  }
}
