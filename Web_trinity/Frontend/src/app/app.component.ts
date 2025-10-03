import { Component } from '@angular/core';
import { HeaderComponent } from "./Estructura/header/header.component";
import { FooterComponent } from './Estructura/footer/footer.component';
import { RouterModule } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trinity';
}