import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearOrdenGastoComponent } from './crear-orden-gasto/crear-orden-gasto.component';

const routes: Routes = [
  {
    path: 'crear-orden-gasto',
    component: CrearOrdenGastoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EjecucionPresupuestalRoutingModule { }
