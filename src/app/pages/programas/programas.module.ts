import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramasRoutingModule } from './programas-routing.module';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material/material.module';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListarProgramasComponent
  ],
  imports: [
    CommonModule,
    ProgramasRoutingModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    NgxPaginationModule
  ]
})
export class ProgramasModule { }
