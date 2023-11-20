import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.page.html',
  styleUrls: ['qr.page.scss'],
})
export class QrPage {
  barcodes: any[] = [];

  constructor(private alertController: AlertController) {}

  async escanearQR() {
    try {
      // Solicitar permisos
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }

      // Escanear códigos QR
      const { barcodes } = await BarcodeScanner.scan();
      this.barcodes.push(...barcodes);

      // Puedes realizar acciones adicionales con los códigos escaneados si es necesario

    } catch (error) {
      console.error('Error al escanear el QR', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      // Solicitar permisos de la cámara
      const result = await BarcodeScanner.requestPermissions();
      return result.camera === 'granted' || result.camera === 'limited';
    } catch (error) {
      console.error('Error al solicitar permisos', error);
      return false;
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, concede permisos de cámara para utilizar el escáner de códigos QR.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
