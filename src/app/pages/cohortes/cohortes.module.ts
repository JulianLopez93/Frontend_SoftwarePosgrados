import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CohortesRoutingModule } from './cohortes-routing.module';
import { ListarCohortesComponent } from './listar-cohortes/listar-cohortes.component';


@NgModule({
  declarations: [
    ListarCohortesComponent
  ],
  imports: [
    CommonModule,
    CohortesRoutingModule
  ]
})
export class CohortesModule { }
