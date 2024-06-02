import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { OlvideContrasenaComponent } from './olvide-contrasena/olvide-contrasena.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';


@NgModule({
  declarations: [
    LoginComponent,
    OlvideContrasenaComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule
  ]
})
export class AuthModule { }
