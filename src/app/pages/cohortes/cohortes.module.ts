import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CohortesRoutingModule } from './cohortes-routing.module';
import { ListarCohortesComponent } from './listar-cohortes/listar-cohortes.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListarCohortesComponent
  ],
  imports: [
    CommonModule,
    CohortesRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class CohortesModule { }
