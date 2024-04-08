import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

import { CohortesService } from '@app/services/cohortes.service';
import { ProgramasService } from '@app/services/programas.service';
import { PresupuestosService } from '@app/services/presupuestos.service';

@Component({
  selector: 'app-listar-presupuestos',
  templateUrl: './listar-presupuestos.component.html',
  styleUrls: ['./listar-presupuestos.component.css']
})
export class ListarPresupuestosComponent {
  presupuestos: any[] = [];
  displayedColumns: string[] = ['numero cohorte','fecha cohorte','programa','departamento', 'facultad', 'estado', 'observaciones','acciones'];
  listadoProgramas:any[] = [];
  form!: FormGroup;
  nombre:string='';
  cohortes: any[] = [];
  p: number = 1;
  searchText: string = '';
  filteredPresupuestos: any[] = [];

  constructor(private cohortesService: CohortesService,
              private programasService: ProgramasService,
              private route:Router,
              private presupuestosServices: PresupuestosService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerPresupuestos();
    //this.obtenerCohortes();
  }


  obtenerPresupuestos() {
    this.presupuestosServices.getPresupuestos().subscribe(
      (result) => {
        console.log(result);
        this.presupuestos = result;
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener las cohortes:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredPresupuestos = this.presupuestos.filter(presupuesto =>
        presupuesto.cohorte.numero.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.fecha.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.departamento.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.departamento.facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredPresupuestos = this.presupuestos;
    }
  }

  openBudgetForm()
  {
    this.route.navigate(['presupuestos/crear-presupuesto']);

  }

  

  /*
  editarCohorte(idCohorte:string, numero:string, fecha:any, idPrograma:any)
  {
    try
    {
      console.log(idCohorte);
      console.log(numero);
      console.log(fecha);
      console.log(idPrograma);

      const params =
      {
        numero: numero,
        fecha:fecha,
        idCohorte:idCohorte,
        idPrograma: idPrograma
      }
      console.log(params);
      this.cohortesService.editCohorte(numero, fecha, idCohorte, idPrograma).subscribe((result:any) => {
        console.log(result);
        if (result = "Cohorte actualizada")
        {
          console.log("Cohorte actualizada");
          this.obtenerCohortes();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarCohorte(idCohorte:string)
  {
    try
    {
      console.log(idCohorte);
      this.cohortesService.deleteCohorte(idCohorte).subscribe((result:any) => {
        console.log(result);
        if (result = "Cohorte eliminado")
        {
          console.log("Cohorte eliminada");
          this.obtenerCohortes();
        }

      });
    }
    catch(error)
      {

      }

  }
  


  openDeleteDialog(cohorteId: string, modulo:string):void{
    const dialogRef = this.dialog.open(PopupEliminarComponent , {
      width:'300px',
      data:{
        modulo: modulo,
        id: cohorteId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarCohorte(cohorteId);
      }
    });


  }

  obtenerProgramas() {
    this.programasService.getProgramas().subscribe(
      (result) => {
        this.listadoProgramas = result;

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }
  */

}
