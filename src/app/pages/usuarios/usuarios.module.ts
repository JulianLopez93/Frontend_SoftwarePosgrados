import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class UsuariosModule { }
