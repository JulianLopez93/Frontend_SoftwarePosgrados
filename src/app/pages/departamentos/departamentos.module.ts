import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ListarDepartamentosComponent } from './listar-departamentos/listar-departamentos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ListarDepartamentosComponent,
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule
  ]
})
export class DepartamentosModule { }
