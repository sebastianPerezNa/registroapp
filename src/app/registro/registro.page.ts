import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';

interface Comuna {
  id: number;
  nombre: string;
  region_id: number;
  // Otros campos necesarios
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  usuario: string = '';
  contrasena: string = '';
  correo: string = '';
  selectedRegion: number = 0;
  regions: any[] = [];
  comunas: Comuna[] = [];
  selectedComuna: Comuna | null = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private storage: Storage,
    private http: HttpClient,
  ) {
    this.selectedComuna = null;
    this.initStorage();
  }

  ngOnInit() {
    this.getRegiones();
    // No es necesario obtener las comunas aquí, ya que se obtienen al cargar las regiones
  }

  async initStorage() {
    await this.storage.create();
  }

  getComunasByRegion(regionId: number) {
    this.comunas = []; // Limpiar la lista antes de cargar nuevas comunas

    const fetchComunas = (page: number = 1) => {
      const apiUrl = `https://dev.matiivilla.cl/duoc/location/comuna/${regionId}?page=${page}`;

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          console.log('Datos de la API:', data); // Imprime los datos de la API para depuración

          if (data && data.data && data.data.length > 0) {
            // Filtrar las comunas para que coincidan con la región seleccionada
            const comunasByRegion: Comuna[] = data.data.filter((comuna: Comuna) => comuna.region_id === regionId);

            // Agregar las comunas filtradas a la lista
            this.comunas = this.comunas.concat(comunasByRegion);

            // Verificar si hay más páginas y cargarlas si es necesario
            if (data.pages > page) {
              fetchComunas(page + 1);
            }
          }
        },
        (error) => {
          console.error('Error al obtener las comunas:', error); // Imprime el error completo para depuración
        }
      );
    };

    fetchComunas(); // Iniciar la carga de comunas
  }


  getRegiones() {
    this.http.get('https://dev.matiivilla.cl/duoc/location/region').subscribe(
      (data: any) => {
        if (data && data.data && data.data.length > 0) {
          this.regions = data.data;
          this.selectedRegion = this.regions[0].id;
          this.getComunasByRegion(this.selectedRegion);
        }
      },
      (error) => {
        console.error('Error al obtener las regiones:', error);

        // Muestra un mensaje de error en la interfaz de usuario
        this.presentAlert('Error al obtener regiones. Por favor, inténtelo de nuevo más tarde.');
      }
    );
  }

  registro() {
    if (this.usuario && this.contrasena) {
      const datosRegistro = {
        usuario: this.usuario,
        contrasena: this.contrasena,
        region: this.selectedRegion,
      };

      this.storage.set('datosRegistro', JSON.stringify(datosRegistro)).then(() => {
        console.log('Datos de Registro Almacenados:', datosRegistro);
        this.presentAlert('Su registro ha sido exitoso. Puede iniciar sesión ahora.');
        this.router.navigate(['/login']);
      });
    } else {
      this.presentAlert('Por favor, complete todos los campos.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: message,
      buttons: ['Cerrar'],
    });

    await alert.present();
  }
}
