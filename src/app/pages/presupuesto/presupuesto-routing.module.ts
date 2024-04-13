import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPresupuestosComponent } from './listar-presupuestos/listar-presupuestos.component';
import { CrearPresupuestoComponent } from './crear-presupuesto/crear-presupuesto.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-presupuestos'
  },
  {
    path: 'listar-presupuestos',
    component: ListarPresupuestosComponent,
  },
  {
    path: 'crear-presupuesto/:idCohorte',
    component: CrearPresupuestoComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-presupuestos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestoRoutingModule { }
