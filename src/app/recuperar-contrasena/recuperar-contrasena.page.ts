import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  usuario: string = '';
  contrasenaRegistrada: string = '';
  mostrarContrasenaAlert: boolean = false;

  constructor(
    private alertController: AlertController,
    private storage: Storage,
    private router: Router
  ) {}

  async ngOnInit() {
    // Asegurarse de que la base de datos esté creada al inicializar el componente
    await this.storage.create();
  }

  recuperarContrasena() {
    if (this.usuario) {
      // Obtén la contraseña almacenada en el registro
      this.storage.get('datosRegistro').then((data) => {
        const datosRegistro = JSON.parse(data);
        if (datosRegistro && datosRegistro.usuario === this.usuario) {
          this.contrasenaRegistrada = datosRegistro.contrasena;
          this.mostrarContrasenaAlert = true;
        } else {
          this.presentAlert('Usuario no encontrado. Verifica el usuario ingresado.');
        }
      });
    } else {
      this.presentAlert('Por favor, ingresa el nombre de usuario.');
    }
  }

  mostrarContrasena() {
    // Muestra el mensaje emergente con la contraseña
    this.mostrarContrasenaAlert = true;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Recuperación de Contraseña',
      message: message,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  irALogin() {
    // Navegar a la página de login
    this.router.navigate(['/login']);
  }
}
