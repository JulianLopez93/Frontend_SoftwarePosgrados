import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosTransferenciasRoutingModule } from './egresos-transferencias-routing.module';
import { ListarEgresosTransferenciasComponent } from './listar-egresos-transferencias/listar-egresos-transferencias.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarEgresosTransferenciasComponent
  ],
  imports: [
    CommonModule,
    EgresosTransferenciasRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:
  [
    ListarEgresosTransferenciasComponent
  ]
})
export class EgresosTransferenciasModule { }
