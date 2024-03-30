import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-programas'
  },
  {
    path: 'listar-programas',
    component: ListarProgramasComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-programas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule { }
