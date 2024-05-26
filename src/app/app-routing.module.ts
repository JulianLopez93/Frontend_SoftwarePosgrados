import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import(`@pages/auth/auth.module`).then(m => m.AuthModule)
  },
  {

    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'pantalla-principal',
        loadChildren: () => import(`@pages/main-screen/main-screen.module`).then(m => m.MainScreenModule),
      },
      {
        path: 'facultades',
        loadChildren: () => import(`@pages/facultades/facultades.module`).then(m => m.FacultadesModule),
      },
      {
        path: 'departamentos',
        loadChildren: () => import(`@pages/departamentos/departamentos.module`).then(m => m.DepartamentosModule),
      },
      {
        path: 'programas',
        loadChildren: () => import(`@pages/programas/programas.module`).then(m => m.ProgramasModule),
      },
      {
        path: 'cohortes',
        loadChildren: () => import(`@pages/cohortes/cohortes.module`).then(m => m.CohortesModule),
      },
      {
        path: 'tipos-compensacion',
        loadChildren: () => import(`@pages/tipos/tipo-compensacion/tipo-compensacion.module`).then(m => m.TipoCompensacionModule),
      },
      {
        path: 'tipos-costo',
        loadChildren: () => import(`@pages/tipos/tipo-costo/tipo-costo.module`).then(m => m.TipoCostoModule),
      },
      {
        path: 'tipos-transferencia',
        loadChildren: () => import(`@pages/tipos/tipo-transferencia/tipo-transferencia.module`).then(m => m.TipoTransferenciaModule),
      },
      {
        path: 'tipos-descuento',
        loadChildren: () => import(`@pages/tipos/tipo-descuento/tipo-descuento.module`).then(m => m.TipoDescuentoModule),
      },
      {
        path: 'tipos-inversion',
        loadChildren: () => import(`@pages/tipos/tipo-inversion/tipo-inversion.module`).then(m => m.TipoInversionModule),
      },
      {
        path: 'presupuestos',
        loadChildren: () => import(`@pages/presupuesto/presupuesto.module`).then(m => m.PresupuestoModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import(`@pages/usuarios/usuarios.module`).then(m => m.UsuariosModule),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pantalla-principal'
  },
  {
    path: '**',
    redirectTo: 'pantalla-principal'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
