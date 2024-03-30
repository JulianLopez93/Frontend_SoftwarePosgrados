import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { ListarDepartamentosComponent } from './listar-departamentos/listar-departamentos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { PopupCrearEditarDepartamentosComponent } from './listar-departamentos/popup-crear-editar-departamentos/popup-crear-editar-departamentos.component';
import { PopupEliminarDepartamentosComponent } from './listar-departamentos/popup-eliminar-departamentos/popup-eliminar-departamentos.component';

@NgModule({
  declarations: [
    ListarDepartamentosComponent,
    PopupCrearEditarDepartamentosComponent,
    PopupEliminarDepartamentosComponent
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
