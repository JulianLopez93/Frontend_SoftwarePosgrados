import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {

    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'pantalla-principal',
        loadChildren: () => import(`@pages/main-screen/main-screen.module`).then(m => m.MainScreenModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
