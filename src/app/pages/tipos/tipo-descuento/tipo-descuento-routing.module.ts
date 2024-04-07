import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTiposDescuentoComponent } from './listar-tipos-descuento/listar-tipos-descuento.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'listar-tipos-descuento'
  },
  {
    path: 'listar-tipos-descuento',
    component: ListarTiposDescuentoComponent,
  },
  {
    path:'**',
    redirectTo: 'listar-tipos-descuento'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoDescuentoRoutingModule { }
