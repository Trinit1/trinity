import { Routes, provideRouter } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

import { HomeComponent } from './Páginas/home/home.component';
import { RegistrosComponent } from './Páginas/registros/registros.component';
import { StockComponent } from './Páginas/stock/stock.component';
import { UsersComponent } from './Páginas/users/users.component';
import { NoFoundComponent } from './Páginas/no-found/no-found.component';
import { AlertasComponent } from './Páginas/alertas/alertas.component';
import { DetallesComponent } from './Páginas/alertas/detalles/detalles.component';
import { OtrosComponent } from './Páginas/otros/otros.component';
import { ProductsComponent } from './Páginas/products/products.component';
import { DashboardComponent } from './Páginas/dashboard/dashboard.component';
import { LoginComponent } from './Páginas/login/login.component';
import { RegistroComponent } from './Páginas/registro/registro.component';
import { CategoriesComponent } from './Páginas/categories/categories.component';
import { ProductosPorCategoriaComponent } from './paginas/productos-categoria/productos-categoria.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard] },
  { path: 'registros', component: RegistrosComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'alertas', component: AlertasComponent, canActivate: [AuthGuard] },
  { path: 'detalles', component: DetallesComponent, canActivate: [AuthGuard] },
  { path: 'otros', component: OtrosComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'productos/categoria/:id', component: ProductosPorCategoriaComponent, canActivate: [AuthGuard] },

  // Rutas públicas
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // Ruta comodín (404)
  { path: '**', component: NoFoundComponent }
];

export const AppRoutingModule = provideRouter(routes);
