import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoInversionRoutingModule } from './tipo-inversion-routing.module';
import { ListarTiposInversionComponent } from './listar-tipos-inversion/listar-tipos-inversion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarTiposInversionComponent
  ],
  imports: [
    CommonModule,
    TipoInversionRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class TipoInversionModule { }
