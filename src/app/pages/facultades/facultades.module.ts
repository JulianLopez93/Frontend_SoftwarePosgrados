import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultadesRoutingModule } from './facultades-routing.module';
import { ListarFacultadesComponent } from './listar-facultades/listar-facultades.component';


@NgModule({
  declarations: [
    ListarFacultadesComponent
  ],
  imports: [
    CommonModule,
    FacultadesRoutingModule
  ]
})
export class FacultadesModule { }
