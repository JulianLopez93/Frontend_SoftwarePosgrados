import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { ListarPresupuestosComponent } from './listar-presupuestos/listar-presupuestos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearPresupuestoComponent } from './crear-presupuesto/crear-presupuesto.component';


@NgModule({
  declarations: [
    ListarPresupuestosComponent,
    CrearPresupuestoComponent
  ],
  imports: [
    CommonModule,
    PresupuestoRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class PresupuestoModule { }
