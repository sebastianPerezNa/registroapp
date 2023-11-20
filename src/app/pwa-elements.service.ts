// pwa-elements.service.ts

import { Injectable } from '@angular/core';
import '@webcomponents/custom-elements/src/native-shim';
import '@ionic/pwa-elements/loader';

@Injectable({
  providedIn: 'root',
})
export class PwaElementsService {
  constructor() {
    // Llama a la función de inicialización aquí si es necesario
    // Puedes agregar más lógica según sea necesario
    this.initPwaElements();
  }

  private initPwaElements() {
    // Puedes agregar lógica adicional de inicialización aquí si es necesario
  }
}
