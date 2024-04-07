import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoTransferenciaRoutingModule } from './tipo-transferencia-routing.module';
import { ListarTiposTransferenciaComponent } from './listar-tipos-transferencia/listar-tipos-transferencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarTiposTransferenciaComponent
  ],
  imports: [
    CommonModule,
    TipoTransferenciaRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class TipoTransferenciaModule { }
