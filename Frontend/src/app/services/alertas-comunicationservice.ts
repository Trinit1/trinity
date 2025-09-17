import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertasComunicationService {
  private nuevaSalidaSource = new Subject<void>();

  nuevaSalida$ = this.nuevaSalidaSource.asObservable();

  notificarNuevaSalida() {
    this.nuevaSalidaSource.next();
  }
}
