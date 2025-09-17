import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.usuario$.subscribe(usuario => {
      this.nombreUsuario = usuario?.nombre || '';
    });
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
  }

  estaAutenticado(): boolean {
    return this.auth.estaAutenticado();
  }
}
