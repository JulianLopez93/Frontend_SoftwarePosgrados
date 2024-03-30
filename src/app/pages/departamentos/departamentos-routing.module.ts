import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarDepartamentosComponent } from './listar-departamentos/listar-departamentos.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-departamentos'
  },
  {
    path: 'listar-departamentos',
    component: ListarDepartamentosComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-departamentos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
