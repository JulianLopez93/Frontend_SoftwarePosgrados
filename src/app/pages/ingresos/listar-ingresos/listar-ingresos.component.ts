import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IngresosService } from '@app/services/ingresos.service';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { PresupuestosService } from '@app/services/presupuestos.service';

@Component({
  selector: 'app-listar-ingresos',
  templateUrl: './listar-ingresos.component.html',
  styleUrls: ['./listar-ingresos.component.css']
})
export class ListarIngresosComponent {

  ingresos: any[] = [];
  displayedColumns: string[] = ['concepto','valor','acciones'];
  //listadoPresupuestos:any[] = [];
  form!: FormGroup;
  nombre:string='';
  p: number = 1;
  searchText: string = '';
  filteredIngresos: any[] = [];
  idPresupuesto:any;

  constructor(private ingresosService: IngresosService,
              private presupuestosService: PresupuestosService,
              public dialog: MatDialog) {}

  ngOnInit() {

    this.idPresupuesto = localStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerIngresosPorPresupuesto();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }


  /*
  obtenerIngresos() {
    this.ingresosService.getIngresos().subscribe(
      (result) => {
        console.log(result);
        this.ingresos= result;
        this.applyFilter();
      },
      (error) => {
        console.error('Error al obtener los ingresos:', error);
      }
    );
  }
  */
  obtenerIngresosPorPresupuesto()
  {
    this.ingresosService.getIngresosPorPresupuesto(this.idPresupuesto).subscribe((result) =>{
      console.log(result);
      this.ingresos = result;
      this.applyFilter();
    },
    (error) => {
      console.error('Error al obtener los ingresos:', error);
    }
  )
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredIngresos = this.ingresos.filter(ingreso =>
        ingreso.concepto.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredIngresos = this.ingresos;
    }
  }

  editarIngreso(id:number, concepto:string, valor:number)
  {
    try
    {
      console.log(id)
      console.log(concepto);
      console.log(valor);

      this.ingresosService.editIngreso(id, concepto, valor).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Ingreso editado");
          this.obtenerIngresosPorPresupuesto();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarIngreso(id:string)
  {
    try
    {
      console.log(id);
      this.ingresosService.deleteIngreso(id).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Ingreso eliminado");
          this.obtenerIngresosPorPresupuesto();
        }

      });
    }
    catch(error)
      {

      }

  }
  crearIngreso(idPresupuestoEjecucion: number, concepto: string, valor: number) {


    try {
      console.log(idPresupuestoEjecucion);
      console.log(concepto);
      console.log(valor);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        concepto: concepto,
        valor: valor
      };
      console.log(params);
      this.ingresosService.postIngresos(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Ingreso guardado");
          this.obtenerIngresosPorPresupuesto();
        }
      });
    } catch (error) {
      console.error('Error al crear el ingreso:', error);
    }
  }


  openCreateDialog(modulo:string, ingreso?: any): void {
    console.log(ingreso);
    console.log(this.idPresupuesto);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: {
              modulo:modulo,
              concepto: ingreso ? ingreso.concepto : '',
              valor: ingreso ? ingreso.valor : '',
              isEdit: !!ingreso,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (ingreso) {
          console.log("Edita ingreso");
          this.editarIngreso(ingreso.id, result.concepto, result.valor);
        } else {
          console.log("Crea ingreso");
          this.crearIngreso(this.idPresupuesto, result.concepto, result.valor);
        }
      }

    });
  }
  openDeleteDialog(ingresoId: string, modulo:string):void{
    const dialogRef = this.dialog.open(PopupEliminarComponent , {
      width:'300px',
      data:{
        modulo: modulo,
        id: ingresoId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarIngreso(ingresoId);
      }
    });


  }


  /*
  obtenerPresupuestos() {
    this.presupuestosService.getPresupuestos().subscribe(
      (presupuestos) => {
        this.listadoPresupuestos = presupuestos;

      },
      (error) => {
        console.error('Error al obtener los prespupuestos:', error);
      }
    );
  }
  */

}
