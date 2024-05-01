import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-egresos-viajes',
  templateUrl: './listar-egresos-viajes.component.html',
  styleUrls: ['./listar-egresos-viajes.component.css']
})
export class ListarEgresosViajesComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['descripcion', 'numPersonas', 'apoyoDesplazamiento',
    'numViajesPorPersona', 'valorTransporte', 'valorTotal', 'acciones'];
  form!: FormGroup;
  nombre: string = '';
  p: number = 1;
  searchText: string = '';
  filteredEgresos: any[] = [];
  idPresupuesto: any;
  totalEgresos = 0;

  constructor(private egresosService: EgresosService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.idPresupuesto = sessionStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerEgresosViajesPorPresupuesto();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosViajes(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos viajes:', error);
      }
    )
  }

  obtenerEgresosViajesPorPresupuesto() {
    this.egresosService.getEgresosViajesPorPresupuesto(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.egresos = result;
      this.applyFilter();
      this.obtenerTotalEgresos();
    },
      (error) => {
        console.error('Error al obtener los ingresos:', error);
      }
    )
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredEgresos = this.egresos.filter(egreso =>
        egreso.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }


  crearEgresoViajes(idPresupuestoEjecucion: number, descripcion: string, numPersonas: number,
    apoyoDesplazamiento: number, numViajesPorPersona: number, valorTransporte: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(descripcion);
      console.log(numPersonas);
      console.log(apoyoDesplazamiento);
      console.log(numViajesPorPersona);
      console.log(valorTransporte);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        descripcion: descripcion,
        numPersonas: numPersonas,
        apoyoDesplazamiento: apoyoDesplazamiento,
        numViajesPorPersona: numViajesPorPersona,
        valorTransporte: valorTransporte
      };
      console.log(params);
      this.egresosService.postEgresoViajes(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Egreso guardado");
          this.obtenerEgresosViajesPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  }
  editarEgresoViajes(id: number, descripcion: string, numPersonas: number,
    apoyoDesplazamiento: number, numViajesPorPersona: number, valorTransporte: number) {
    try {
      console.log(id);
      console.log(descripcion);
      console.log(numPersonas);
      console.log(apoyoDesplazamiento);
      console.log(numViajesPorPersona);
      console.log(valorTransporte);

      this.egresosService.editEgresoViajes(id, descripcion, numPersonas, apoyoDesplazamiento
        , numViajesPorPersona, valorTransporte).subscribe((result: any) => {
          console.log(result);
          if (result = "OK") {
            console.log("Egreso editado");
            this.obtenerEgresosViajesPorPresupuesto();
            this.obtenerTotalEgresos();
          }

        });
    }
    catch (error) {

    }

  }

  eliminarEgresoViajes(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoViajes(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("egreso eliminado");
          this.obtenerEgresosViajesPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  openCreateDialog(modulo: string, egreso?: any): void {
    console.log(egreso);
    console.log(this.idPresupuesto);

    const dialogRef = this.dialog.open(PopupCrearEditarEgresoComponent, {
      width: '350px',
      data: {
        modulo: modulo,
        descripcion: egreso ? egreso.descripcion : '',
        numPersonas: egreso ? egreso.numPersonas : '',
        apoyoDesplazamiento: egreso ? egreso.apoyoDesplazamiento : '',
        numViajesPorPersona: egreso ? egreso.numViajesPorPersona : '',
        valorTransporte: egreso ? egreso.valorTransporte : '',
        isEdit: !!egreso,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (egreso) {
          console.log("Edita egreso");
          this.editarEgresoViajes(egreso.id, result.descripcion, result.numPersonas, result.apoyoDesplazamiento,
            result.numViajesPorPersona, result.valorTransporte);
        } else {
          console.log("Crea egreso");
          this.crearEgresoViajes(this.idPresupuesto, result.descripcion, result.numPersonas,
            result.apoyoDesplazamiento, result.numViajesPorPersona, result.valorTransporte);
        }
      }

    });
  }

  openDeleteDialog(egresoId: string, modulo: string): void {
    const dialogRef = this.dialog.open(PopupEliminarComponent, {
      width: '300px',
      data: {
        modulo: modulo,
        id: egresoId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarEgresoViajes(egresoId);
      }
    });


  }
}
