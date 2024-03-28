import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainScreenRoutingModule } from './main-screen-routing.module';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainScreenComponent
  ],
  imports: [
    CommonModule,
    MainScreenRoutingModule,
    SharedModule
  ]
})
export class MainScreenModule { }
