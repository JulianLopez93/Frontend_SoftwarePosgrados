import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-egresos-inversion',
  templateUrl: './listar-egresos-inversion.component.html',
  styleUrls: ['./listar-egresos-inversion.component.css']
})
export class ListarEgresosInversionComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['concepto', 'valor', 'tipo_inversion', 'acciones'];
  form!: FormGroup;
  nombre: string = '';
  p: number = 1;
  searchText: string = '';
  filteredEgresos: any[] = [];
  idPresupuesto: any;
  listadoTipoPerteneciente: any[] = [];
  totalEgresos = 0;

  constructor(private egresosService: EgresosService,
    private tiposService: TiposService,
    public dialog: MatDialog) { }


  ngOnInit() {

    this.idPresupuesto = localStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerEgresosInversionPorPresupuesto();
    this.obtenerTiposInversion();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosInversiones(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos inversion:', error);
      }
    )
  }

  obtenerEgresosInversionPorPresupuesto() {
    this.egresosService.getEgresosInversionPorPresupuesto(this.idPresupuesto).subscribe((result) => {
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
        egreso.tipoInversion.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.concepto.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }

  obtenerTiposInversion() {
    this.tiposService.getTiposInversion().subscribe(
      (result) => {
        this.listadoTipoPerteneciente = result;

      },
      (error) => {
        console.error('Error al obtener los tipos de inversión:', error);
      }
    );
  }

  crearEgresoInversion(idPresupuestoEjecucion: number, concepto: string, valor: number, idTipoInversion: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(concepto);
      console.log(valor);
      console.log(idTipoInversion);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        concepto: concepto,
        valor: valor,
        idTipoInversion: idTipoInversion
      };
      console.log(params);
      this.egresosService.postEgresoInversion(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Egreso guardado");
          this.obtenerEgresosInversionPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  }
  editarEgresoInversion(id: number, concepto: string, valor: number, idTipoInversion: number) {
    try {
      console.log(id);
      console.log(concepto);
      console.log(valor);
      console.log(idTipoInversion);

      this.egresosService.editEgresoInversion(id, concepto, valor, idTipoInversion).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Egreso editado");
          this.obtenerEgresosInversionPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  eliminarEgresoInversion(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoInversion(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("egreso eliminado");
          this.obtenerEgresosInversionPorPresupuesto();
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
        concepto: egreso ? egreso.concepto : '',
        valor: egreso ? egreso.valor : '',
        isEdit: !!egreso,
        listaTipoPerteneciente: this.listadoTipoPerteneciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (egreso) {
          console.log("Edita egreso");
          this.editarEgresoInversion(egreso.id, result.concepto, result.valor, result.entidadPerteneciente);
        } else {
          console.log("Crea egreso");
          this.crearEgresoInversion(this.idPresupuesto, result.concepto, result.valor, result.entidadPerteneciente);
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
        this.eliminarEgresoInversion(egresoId);
      }
    });


  }

}
