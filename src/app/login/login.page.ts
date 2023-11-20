import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  registroExistente: boolean = false;
  usuarioNombre: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create(); // Asegúrate de llamar a create() antes de acceder a la base de datos
    this.verificarRegistroExistente();
  }

  async verificarRegistroExistente() {
    try {
      const storedUserJSON = await this.storage.get('datosRegistro');
      this.registroExistente = !!storedUserJSON && typeof storedUserJSON === 'string';

      if (this.registroExistente) {
        const storedUser = JSON.parse(storedUserJSON);
        this.usuarioNombre = storedUser.nombre;
      }
    } catch (error) {
      console.error('Error al obtener datos de registro:', error);
    }
  }

  async login() {
    if (!this.username || !this.password) {
      this.presentAlert('Por favor, complete todos los campos.');
      return;
    }

    if (!this.registroExistente) {
      this.presentAlert('No se encontraron datos de registro. Regístrese primero.');
      return;
    }

    try {
      const storedUserJSON = await this.storage.get('datosRegistro');

      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);

        console.log('Usuario Almacenado:', storedUser);

        if (
          storedUser.usuario === this.username &&
          storedUser.contrasena === this.password
        ) {
          this.router.navigate(['/qr']);
        } else {
          this.presentAlert('Credenciales incorrectas. Inténtelo de nuevo.');
        }
      } else {
        this.presentAlert('No se encontraron datos de registro válidos. Regístrese primero.');
      }
    } catch (error) {
      console.error('Error al obtener datos de registro:', error);
      this.presentAlert('Ha ocurrido un error. Por favor, inténtelo de nuevo.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de inicio de sesión',
      message: message,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }

  goToRegistroPage() {
    this.router.navigate(['/registro']);
  }

  goToRecuperarContrasenaPage() {
    this.router.navigate(['/recuperar-contrasena']);
  }

  goToQr() {
    if (this.registroExistente) {
      this.router.navigate(['/qr']);
    } else {
      this.presentAlert('No se encontraron datos de registro. Regístrese primero.');
    }
  }
}
