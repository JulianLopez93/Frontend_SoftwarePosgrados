import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosOtrosServiciosDocenteRoutingModule } from './egresos-otros-servicios-docente-routing.module';
import { ListarOtrosServiciosDocenteComponent } from './listar-otros-servicios-docente/listar-otros-servicios-docente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarOtrosServiciosDocenteComponent
  ],
  imports: [
    CommonModule,
    EgresosOtrosServiciosDocenteRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarOtrosServiciosDocenteComponent
  ]
})
export class EgresosOtrosServiciosDocenteModule { }
