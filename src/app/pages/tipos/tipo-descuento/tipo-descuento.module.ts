import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDescuentoRoutingModule } from './tipo-descuento-routing.module';
import { ListarTiposDescuentoComponent } from './listar-tipos-descuento/listar-tipos-descuento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarTiposDescuentoComponent
  ],
  imports: [
    CommonModule,
    TipoDescuentoRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class TipoDescuentoModule { }
