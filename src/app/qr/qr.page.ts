import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.page.html',
  styleUrls: ['qr.page.scss'],
})
export class QrPage {
  barcodes: any[] = [];
  registroCompleto: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async escanearQR() {
    try {
      // Utilizar la función startScan directamente
      const result = await BarcodeScanner.startScan();

      if (!result.hasContent) {
        // Escaneo cancelado o no se detectó ningún código QR
        return;
      }

      // Código QR escaneado con éxito
      this.router.navigate(['/asistencia']);
    } catch (error) {
      console.error('Error al escanear el QR', error);
      this.presentAlert('Error al escanear el QR. Por favor, intenta de nuevo.');
    }
  }

  async presentAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  irAAsistencia() {
    this.router.navigate(['/asistencia']);
  }
}
