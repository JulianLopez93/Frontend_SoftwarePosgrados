import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTiposCompensacionComponent } from './listar-tipos-compensacion/listar-tipos-compensacion.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-tipos-compensacion'
  },
  {
    path: 'listar-tipos-compensacion',
    component: ListarTiposCompensacionComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-tipos-compensacion'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoCompensacionRoutingModule { }
