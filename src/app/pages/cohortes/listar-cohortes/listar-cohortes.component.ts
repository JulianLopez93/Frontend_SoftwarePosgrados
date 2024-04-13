import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupConfirmarCreacionComponent } from './popup-confirmar-creacion/popup-confirmar-creacion.component';
import { CohortesService } from '@app/services/cohortes.service';
import { ProgramasService } from '@app/services/programas.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-cohortes',
  templateUrl: './listar-cohortes.component.html',
  styleUrls: ['./listar-cohortes.component.css']
})
export class ListarCohortesComponent {
  programas: any[] = [];
  displayedColumns: string[] = ['numero','fecha','programa','departamento', 'facultad','acciones'];
  listadoProgramas:any[] = [];
  form!: FormGroup;
  nombre:string='';
  cohortes: any[] = [];
  p: number = 1;
  searchText: string = '';
  filteredCohortes: any[] = [];
  presupuesto:any;

  constructor(private cohortesService: CohortesService,
    private programasService: ProgramasService,
    private presupuestosService:PresupuestosService,
    private route:Router,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerCohortes();
    this.obtenerProgramas();
    
  }


  obtenerCohortes() {
    this.cohortesService.getCohortes().subscribe(
      (result) => {
        console.log(result);
        this.cohortes = result;
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener las cohortes:', error);
      }
    );
  }
  obtenerPresupuestoPorCohorte(cohorte:any)
  {
    this.presupuestosService.getPresupuestoPorCohorte(cohorte.id).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Entra condicional");
          this.presupuesto = result;
          console.log(this.presupuesto);
          localStorage.setItem('idPresupuesto', this.presupuesto.id);
          this.route.navigate(['presupuestos/crear-presupuesto',cohorte.id.toString()]);

        }
        else
        {
          this.openBudgetCreationDialog(cohorte);
        }
          
    });

  }

  applyFilter() {
    if (this.searchText) {
      this.filteredCohortes = this.cohortes.filter(cohorte =>
        cohorte.numero.toLowerCase().includes(this.searchText.toLowerCase()) ||
        cohorte.fecha.toLowerCase().includes(this.searchText.toLowerCase()) ||
        cohorte.programa.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        cohorte.programa.departamento.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        cohorte.programa.departamento.facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredCohortes = this.cohortes;
    }
  }

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
        if (result = "OK")
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
        if (result = "OK")
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
  crearCohorte(numero:string, fecha:any, programa:any)
  {
    try
    {
      console.log(numero);
      console.log(fecha)
      console.log(programa);
      const params =
      {
        numero: numero,
        fecha: fecha,
        idPrograma: programa
      }
      console.log(params);
      this.cohortesService.postCohortes(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Cohorte guardada");
          this.obtenerCohortes();
        }

      });
    }
    catch(error)
      {

      }
  }

  openBudgetForm(idCohorte:number)
  {

    this.obtenerPresupuestoPorCohorte(idCohorte);
    console.log(this.presupuesto);
    //this.route.navigate(['presupuestos/crear-presupuesto', idCohorte.toString()]);

  }

  openBudgetCreationDialog(cohorte:any)
  {
    console.log(cohorte);

    const dialogRef = this.dialog.open(PopupConfirmarCreacionComponent,{
      width:'350px',
      data: {
              idCohorte: cohorte.id,
              numero: cohorte.numero,
              programa: cohorte.programa.nombre
            }
    })

  }


  openCreateDialog(modulo:string, cohorte?: any): void {
    console.log(cohorte);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: {
              modulo:modulo,
              numero: cohorte ? cohorte.numero : '',
              fecha: cohorte ? cohorte.fecha:'',
              isEdit: !!cohorte,
              listaProgramas: this.listadoProgramas
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (cohorte) {
          console.log("Edita Cohorte");
          this.editarCohorte(cohorte.id, result.numero, result.fecha, result.entidadPerteneciente);
        } else {
          console.log("Crea cohorte");
           this.crearCohorte(result.numero, result.fecha,result.entidadPerteneciente);
        }
      }

    });
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

}
