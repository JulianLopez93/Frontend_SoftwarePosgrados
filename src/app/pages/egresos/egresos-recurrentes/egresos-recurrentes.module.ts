import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosRecurrentesRoutingModule } from './egresos-recurrentes-routing.module';
import { ListarEgresosRecurrentesComponent } from './listar-egresos-recurrentes/listar-egresos-recurrentes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosRecurrentesComponent
  ],
  imports: [
    CommonModule,
    EgresosRecurrentesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:
  [ListarEgresosRecurrentesComponent]
})

export class EgresosRecurrentesModule { }
