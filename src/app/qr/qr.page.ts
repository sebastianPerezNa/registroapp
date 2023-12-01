import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';

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
      const result = await BarcodeScanner.startScan();

      if (!result.hasContent) {
        return;
      }

      this.barcodes.push(result);
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

  generarCodigoQR() {
    const datosQR = 'Nombre profesor: Iturra, Hora: ' + new Date().toLocaleTimeString() + ', Sala: L9';

    QRCode.toDataURL(datosQR, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR', err);
        this.presentAlert('Error al generar el código QR. Por favor, intenta de nuevo.');
      } else {
        // Añadir el código QR a la lista
        this.barcodes.push({ format: 'QR_CODE', rawValue: datosQR, imageUrl: url });
      }
    });
  }
}
