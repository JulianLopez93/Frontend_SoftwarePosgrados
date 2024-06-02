import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OlvideContrasenaComponent } from './olvide-contrasena/olvide-contrasena.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  /*
  {
    path: 'cambio-contrasena',
    component: CambiarContrasenaComponent
  },
  */
  {
    path: 'olvide-contrasena',
    component: OlvideContrasenaComponent
  },
  {
    path: 'cambiar-contrasena',
    component: CambiarContrasenaComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
