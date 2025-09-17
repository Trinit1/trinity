import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  rol = '';
  cargando = false;

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    if (!this.nombre || !this.email || !this.password || !this.rol) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this.cargando = true;

    const userData: {
      nombre: string;
      email: string;
      password: string;
      rol: string;
    } = {
      nombre: this.nombre.trim(),
      email: this.email.trim(),
      password: this.password.trim(),
      rol: this.rol
    };

    this.http.post<{ token: string; usuario: any }>('http://localhost:3000/api/register', userData).subscribe({
      next: () => {
        alert('✅ Usuario registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Error al registrar usuario:', err);
        alert('Error al registrar el usuario. Verifica los datos o intenta más tarde.');
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}

