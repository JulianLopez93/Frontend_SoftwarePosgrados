import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosGeneralesRoutingModule } from './egresos-generales-routing.module';
import { ListarEgresosGeneralesComponent } from './listar-egresos-generales/listar-egresos-generales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosGeneralesComponent
  ],
  imports: [
    CommonModule,
    EgresosGeneralesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarEgresosGeneralesComponent
  ]
})
export class EgresosGeneralesModule { }
