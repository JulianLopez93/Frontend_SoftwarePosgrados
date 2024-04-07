import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { ListarPresupuestosComponent } from './listar-presupuestos/listar-presupuestos.component';


@NgModule({
  declarations: [
    ListarPresupuestosComponent
  ],
  imports: [
    CommonModule,
    PresupuestoRoutingModule
  ]
})
export class PresupuestoModule { }
