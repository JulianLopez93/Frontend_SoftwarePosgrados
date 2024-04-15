import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosViajesRoutingModule } from './egresos-viajes-routing.module';
import { ListarEgresosViajesComponent } from './listar-egresos-viajes/listar-egresos-viajes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarEgresosViajesComponent
  ],
  imports: [
    CommonModule,
    EgresosViajesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarEgresosViajesComponent
  ]
})
export class EgresosViajesModule { }
