import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearOrdenGastoComponent } from './crear-orden-gasto/crear-orden-gasto.component';
import { ReporteEgresosComponent } from './reporte-egresos/reporte-egresos.component';

const routes: Routes = [
  {
    path: 'crear-orden-gasto',
    component: CrearOrdenGastoComponent,
  },
  {
    path: 'reporte-egresos/:idCohorte',
    component: ReporteEgresosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionPresupuestalRoutingModule { }
