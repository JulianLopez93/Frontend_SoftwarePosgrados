import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosServiciosNoDocenteRoutingModule } from './egresos-servicios-no-docente-routing.module';
import { ListarEgresosServiciosNoDocenteComponent } from './listar-egresos-servicios-no-docente/listar-egresos-servicios-no-docente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosServiciosNoDocenteComponent
  ],
  imports: [
    CommonModule,
    EgresosServiciosNoDocenteRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:
  [
    ListarEgresosServiciosNoDocenteComponent
  ]
})
export class EgresosServiciosNoDocenteModule { }
