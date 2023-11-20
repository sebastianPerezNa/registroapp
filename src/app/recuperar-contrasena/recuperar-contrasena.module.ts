import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecuperarContrasenaPageRoutingModule } from './recuperar-contrasena-routing.module';
import { RecuperarContrasenaPage } from './recuperar-contrasena.page';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importa IonicStorageModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContrasenaPageRoutingModule,
    IonicStorageModule.forRoot(), // Configura IonicStorageModule
  ],
  declarations: [RecuperarContrasenaPage],
})
export class RecuperarContrasenaPageModule {}
