import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarFacultadesComponent } from './listar-facultades/listar-facultades.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-facultades'
  },
  {
    path: 'listar-facultades',
    component: ListarFacultadesComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-facultades'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultadesRoutingModule { }
