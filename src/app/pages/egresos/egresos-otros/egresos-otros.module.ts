import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosOtrosRoutingModule } from './egresos-otros-routing.module';
import { ListarEgresosOtrosComponent } from './listar-egresos-otros/listar-egresos-otros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosOtrosComponent
  ],
  imports: [
    CommonModule,
    EgresosOtrosRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarEgresosOtrosComponent
  ]
})
export class EgresosOtrosModule { }
