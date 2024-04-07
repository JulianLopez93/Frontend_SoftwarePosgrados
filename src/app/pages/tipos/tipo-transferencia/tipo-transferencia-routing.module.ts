import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTiposTransferenciaComponent } from './listar-tipos-transferencia/listar-tipos-transferencia.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-tipos-transferencia'
  },
  {
    path: 'listar-tipos-transferencia',
    component: ListarTiposTransferenciaComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-tipos-transferencia'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoTransferenciaRoutingModule { }
