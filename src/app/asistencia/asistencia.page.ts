import { Component } from '@angular/core';
import { Camera, CameraOptions, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';

@Component({
  selector: 'app-asistencia',
  templateUrl: 'asistencia.page.html',
  styleUrls: ['asistencia.page.scss'],
})
export class AsistenciaPage {
  public latitude: number = 0;
  public longitude: number = 0;
  public selfieImage: string | undefined; // Variable para almacenar la imagen en formato base64

  constructor() {}

  ionViewDidEnter() {
    this.obtenerUbicacion();
  }

  getCurrentTime(): string {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  }

  async obtenerUbicacion() {
    try {
      const position: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  }

  async tomarSelfie() {
    const options: CameraOptions = {
      quality: 50,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    };

    try {
      const imageData = await Camera.getPhoto(options);
      this.selfieImage = 'data:image/jpeg;base64,' + imageData.base64String;
    } catch (error) {
      console.error('Error al tomar la selfie', error);
    }
  }
}
