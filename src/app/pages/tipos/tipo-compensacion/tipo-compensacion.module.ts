import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCompensacionRoutingModule } from './tipo-compensacion-routing.module';
import { ListarTiposCompensacionComponent } from './listar-tipos-compensacion/listar-tipos-compensacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarTiposCompensacionComponent
  ],
  imports: [
    CommonModule,
    TipoCompensacionRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class TipoCompensacionModule { }
