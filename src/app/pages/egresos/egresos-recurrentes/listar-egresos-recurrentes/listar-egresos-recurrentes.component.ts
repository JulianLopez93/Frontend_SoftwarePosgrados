import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-egresos-recurrentes',
  templateUrl: './listar-egresos-recurrentes.component.html',
  styleUrls: ['./listar-egresos-recurrentes.component.css']
})
export class ListarEgresosRecurrentesComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['unidad', 'cargo', 'valor_hora', 'num_horas', 'valorTotal', 'acciones'];
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

    this.idPresupuesto = localStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerEgresosRecurrentesPorPresupuesto();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosRecurrentes(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos recurrentes adm:', error);
      }
    )
  }

  obtenerEgresosRecurrentesPorPresupuesto() {
    this.egresosService.getEgresosRecurrentesPorPresupuesto(this.idPresupuesto).subscribe((result) => {
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
        egreso.unidad.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.cargo.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }


  crearEgresoRecurrente(idPresupuestoEjecucion: number, unidad: string, cargo: string, valorHora: number, numHoras: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(unidad);
      console.log(cargo);
      console.log(valorHora);
      console.log(numHoras);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        unidad: unidad,
        cargo: cargo,
        valorHora: valorHora,
        numHoras: numHoras
      };
      console.log(params);
      this.egresosService.postEgresoRecurrente(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Egreso guardado");
          this.obtenerEgresosRecurrentesPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  }
  editarEgresoRecurrente(id: number, unidad: string, cargo: string, valorHora: number, numHoras: number) {
    try {
      console.log(id);
      console.log(unidad);
      console.log(cargo);
      console.log(valorHora);
      console.log(numHoras);

      this.egresosService.editEgresoRecurrente(id, unidad, cargo, valorHora, numHoras).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Egreso editado");
          this.obtenerEgresosRecurrentesPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  eliminarEgresoRecurrente(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoRecurrente(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("egreso eliminado");
          this.obtenerEgresosRecurrentesPorPresupuesto();
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
        unidad: egreso ? egreso.unidad : '',
        cargo: egreso ? egreso.cargo : '',
        valorHora: egreso ? egreso.valorHora : '',
        numHoras: egreso ? egreso.numHoras : '',
        isEdit: !!egreso,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (egreso) {
          console.log("Edita egreso");
          this.editarEgresoRecurrente(egreso.id, result.unidad, result.cargo, result.valorHora, result.numHoras);
        } else {
          console.log("Crea egreso");
          this.crearEgresoRecurrente(this.idPresupuesto, result.unidad, result.cargo, result.valorHora, result.numHoras);
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
        this.eliminarEgresoRecurrente(egresoId);
      }
    });


  }

}
