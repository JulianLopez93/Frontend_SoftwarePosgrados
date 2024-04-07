import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTiposCostoComponent } from './listar-tipos-costo/listar-tipos-costo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-tipos-costo'
  },
  {
    path: 'listar-tipos-costo',
    component: ListarTiposCostoComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-tipos-costo'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCostoRoutingModule { }
