import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EjecucionPresupuestalRoutingModule } from './ejecucion-presupuestal-routing.module';
import { CrearOrdenGastoComponent } from './crear-orden-gasto/crear-orden-gasto.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { PopupConfirmarRubroComponent } from './crear-orden-gasto/popup-confirmar-rubro/popup-confirmar-rubro.component';
import { ReporteEgresosComponent } from './reporte-egresos/reporte-egresos.component';


@NgModule({
  declarations: [
    CrearOrdenGastoComponent,
    PopupConfirmarRubroComponent,
    ReporteEgresosComponent
  ],
  imports: [
    CommonModule,
    EjecucionPresupuestalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MaterialModule
  ]
})
export class EjecucionPresupuestalModule { }
