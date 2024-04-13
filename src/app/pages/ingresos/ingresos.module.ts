import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { ListarIngresosComponent } from './listar-ingresos/listar-ingresos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarIngresosComponent
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarIngresosComponent
  ]
})
export class IngresosModule { }
