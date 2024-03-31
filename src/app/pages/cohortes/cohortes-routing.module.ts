import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarCohortesComponent } from './listar-cohortes/listar-cohortes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-cohortes'
  },
  {
    path: 'listar-cohortes',
    component: ListarCohortesComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-cohortes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CohortesRoutingModule { }
