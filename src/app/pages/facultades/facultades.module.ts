import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultadesRoutingModule } from './facultades-routing.module';
import { ListarFacultadesComponent } from './listar-facultades/listar-facultades.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { CrearFacultadComponent } from './listar-facultades/crear-facultad/crear-facultad.component';
import { PopupEliminarFacultadComponent } from './listar-facultades/popup-eliminar-facultad/popup-eliminar-facultad.component';



@NgModule({
  declarations: [
    ListarFacultadesComponent,
    CrearFacultadComponent,
    PopupEliminarFacultadComponent
  ],
  imports: [
    CommonModule,
    FacultadesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule
  ]
})
export class FacultadesModule { }
