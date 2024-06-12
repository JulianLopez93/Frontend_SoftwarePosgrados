import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

import { CohortesService } from '@app/services/cohortes.service';
import { ProgramasService } from '@app/services/programas.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { EjecucionPresupuestalService } from '@app/services/ejecucion-presupuestal.service';
import { error } from 'jquery';

@Component({
  selector: 'app-listar-presupuestos',
  templateUrl: './listar-presupuestos.component.html',
  styleUrls: ['./listar-presupuestos.component.css']
})
export class ListarPresupuestosComponent {
  presupuestos: any[] = [];
  presupuestosPorRevisar: any[] = [];
  displayedColumns: string[] = ['numero cohorte','fecha cohorte','programa', 'facultad', 'estado', 'observaciones','acciones'];
  listadoProgramas:any[] = [];
  form!: FormGroup;
  nombre:string='';
  cohortes: any[] = [];
  ejecucionPresupuesto:any;
  p: number = 1;
  searchText: string = '';
  filteredPresupuestos: any[] = [];

  constructor(private cohortesService: CohortesService,
              private programasService: ProgramasService,
              private route:Router,
              private toastr: ToastrService,
              private presupuestosServices: PresupuestosService,
              private ejecucionPresupuestalService: EjecucionPresupuestalService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerPresupuestosPorRevisar();
    //this.obtenerCohortes();
  }


  obtenerPresupuestosPorRevisar() {
    this.presupuestosServices?.getPresupuestosPorRevisarPorFacultad().subscribe(
      (result) => {
        console.log(result);
        this.presupuestosPorRevisar = result;
        this.applyFilter();
      },
      (error) => {
        this.toastr.error('Error al obtener los presupuestos:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredPresupuestos = this.presupuestosPorRevisar.filter(presupuesto =>
        presupuesto.cohorte.numero.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.fecha.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.departamento.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        presupuesto.cohorte.programa.departamento.facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredPresupuestos = this.presupuestosPorRevisar;
    }
  }



  openBudgetForm()
  {
    this.route.navigate(['presupuestos/crear-presupuesto']);

  }

  desaprobarPresupuesto(idPresupuesto:number)
  {
    console.log(idPresupuesto)
    this.presupuestosServices?.disapprovePresupuesto(idPresupuesto).subscribe(
      (result) => {
        console.log(result)
        this.toastr.success("Presupuesto desaprobado correctamente");
      },
      (error) =>
      {
        this.toastr.error("Error al desaprobar presupuesto");

      }
    )


  }
  aprobarPresupuesto(idPresupuesto:number)
  {
    console.log(idPresupuesto);
    this.presupuestosServices?.approvePresupuesto(idPresupuesto).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success("Presupuesto aprobado correctamente");
        this.obtenerPresupuestosPorRevisar();
      }
    )


  }

  abrirFormularioCDP(presupuesto:any)
  {
    this.ejecucionPresupuestalService.getEjecucionPorPresupuesto(presupuesto.id).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Entra condicional");
          this.ejecucionPresupuesto = result;
          console.log(this.ejecucionPresupuesto);
          sessionStorage.setItem('idCohorte', this.ejecucionPresupuesto.presupuesto.cohorte.numero);
          sessionStorage.setItem('nombrePrograma', this.ejecucionPresupuesto.presupuesto.cohorte.programa.nombre);
          sessionStorage.setItem('nombreFacultad', this.ejecucionPresupuesto.presupuesto.cohorte.programa.facultad.nombre);
          this.route.navigate(['ejecucion-presupuestal/crear-orden-gasto',this.ejecucionPresupuesto.presupuesto.id.toString()]);

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
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
