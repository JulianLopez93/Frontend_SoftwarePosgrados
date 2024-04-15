import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosServiciosDocentesRoutingModule } from './egresos-servicios-docentes-routing.module';
import { ListarEgresosServiciosDocentesComponent } from './listar-egresos-servicios-docentes/listar-egresos-servicios-docentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosServiciosDocentesComponent
  ],
  imports: [
    CommonModule,
    EgresosServiciosDocentesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:
  [ListarEgresosServiciosDocentesComponent]
})
export class EgresosServiciosDocentesModule { }
