import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { PopupEliminarComponent } from './popup-eliminar/popup-eliminar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { PopupCrearEditarComponent } from './popup-crear-editar/popup-crear-editar.component';
import { PopupCrearEditarEgresoComponent } from './popup-crear-editar-egreso/popup-crear-editar-egreso.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PopupEliminarComponent,
    PopupCrearEditarComponent,
    PopupCrearEditarEgresoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    MatTableModule,

  ],
  exports:[
    NavbarComponent
  ]
})
export class SharedModule { }
