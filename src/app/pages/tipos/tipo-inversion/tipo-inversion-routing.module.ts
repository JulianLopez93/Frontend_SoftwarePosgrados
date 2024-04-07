import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTiposInversionComponent } from './listar-tipos-inversion/listar-tipos-inversion.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-tipos-inversion'
  },
  {
    path: 'listar-tipos-inversion',
    component: ListarTiposInversionComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-tipos-inversion'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoInversionRoutingModule { }
