import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoCostoRoutingModule } from './tipo-costo-routing.module';
import { ListarTiposCostoComponent } from './listar-tipos-costo/listar-tipos-costo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarTiposCostoComponent
  ],
  imports: [
    CommonModule,
    TipoCostoRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class TipoCostoModule { }
