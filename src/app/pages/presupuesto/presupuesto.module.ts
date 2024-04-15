import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresupuestoRoutingModule } from './presupuesto-routing.module';
import { ListarPresupuestosComponent } from './listar-presupuestos/listar-presupuestos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { CrearPresupuestoComponent } from './crear-presupuesto/crear-presupuesto.component';
import { IngresosModule } from '../ingresos/ingresos.module';
import { DescuentosModule } from '../descuentos/descuentos.module';
import { EgresosTransferenciasModule } from '../egresos/egresos-transferencias/egresos-transferencias.module';
import { EgresosGeneralesModule } from '../egresos/egresos-generales/egresos-generales.module';
import { EgresosOtrosModule } from '../egresos/egresos-otros/egresos-otros.module';
import { EgresosServiciosNoDocenteModule } from '../egresos/egresos-servicios-no-docente/egresos-servicios-no-docente.module';
import { EgresosOtrosServiciosDocenteModule } from '../egresos/egresos-otros-servicios-docente/egresos-otros-servicios-docente.module';
import { EgresosInversionModule } from '../egresos/egresos-inversion/egresos-inversion.module';
import { EgresosRecurrentesModule } from '../egresos/egresos-recurrentes/egresos-recurrentes.module';
import { EgresosViajesModule } from '../egresos/egresos-viajes/egresos-viajes.module';
import { EgresosServiciosDocentesModule } from '../egresos/egresos-servicios-docentes/egresos-servicios-docentes.module';

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
    ReactiveFormsModule,
    IngresosModule,
    DescuentosModule,
    EgresosTransferenciasModule,
    EgresosGeneralesModule,
    EgresosOtrosModule,
    EgresosServiciosNoDocenteModule,
    EgresosOtrosServiciosDocenteModule,
    EgresosInversionModule,
    EgresosRecurrentesModule,
    EgresosViajesModule,
    EgresosServiciosDocentesModule
  ]
})
export class PresupuestoModule { }
