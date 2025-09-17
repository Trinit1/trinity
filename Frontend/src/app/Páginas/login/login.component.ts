import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensajeError: string = '';
  cargando: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (!this.email.trim() || !this.password.trim()) {
      this.mensajeError = '⚠️ Ingresa el correo y la contraseña.';
      this.limpiarError();
      return;
    }

    this.cargando = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.usuario);
        this.router.navigate(['/dashboard']);
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = '❌ Credenciales inválidas. Intenta de nuevo.';
        this.cargando = false;
        this.limpiarError();
      }
    });
  }

  private limpiarError(): void {
    setTimeout(() => this.mensajeError = '', 3000);
  }
}

