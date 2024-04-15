import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EgresosInversionRoutingModule } from './egresos-inversion-routing.module';
import { ListarEgresosInversionComponent } from './listar-egresos-inversion/listar-egresos-inversion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarEgresosInversionComponent
  ],
  imports: [
    CommonModule,
    EgresosInversionRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports:[
    ListarEgresosInversionComponent
  ]
})
export class EgresosInversionModule { }
