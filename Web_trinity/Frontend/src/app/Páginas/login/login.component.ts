import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
  this.authService.guardarSesion(res.token, res.usuario); // ✅ CORRECTO
  this.router.navigate(['/dashboard']);
}
,
      error: () => {
        this.mensajeError = 'Credenciales inválidas. Intenta de nuevo.';
      }
    });
  }
}
