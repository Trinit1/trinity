import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AxiosService } from '../../services/axios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
