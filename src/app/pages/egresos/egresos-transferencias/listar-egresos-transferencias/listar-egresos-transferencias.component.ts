import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-egresos-transferencias',
  templateUrl: './listar-egresos-transferencias.component.html',
  styleUrls: ['./listar-egresos-transferencias.component.css']
})
export class ListarEgresosTransferenciasComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['descripcion', 'porcentaje', 'tipo_transferencia', 'valorTotal', 'acciones'];
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
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.idPresupuesto = sessionStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerEgresosTransferenciaPorPresupuesto();
    this.obtenerTiposTransferencia();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosTransferencia(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        this.toastr.error('Error al obtener el total de egresos transferencias:', error);
      }
    )
  }

  obtenerEgresosTransferenciaPorPresupuesto() {
    this.egresosService.getEgresosTransferenciaPorPresupuesto(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.egresos = result;
      this.applyFilter();
      this.obtenerTotalEgresos();
    },
      (error) => {
        this.toastr.error('Error al obtener los ingresos:', error);
      }
    )
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredEgresos = this.egresos.filter(egreso =>
        egreso.tipoDescuento.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }

  obtenerTiposTransferencia() {
    this.tiposService.getTiposTransferencia().subscribe(
      (result) => {
        this.listadoTipoPerteneciente = result;

      },
      (error) => {
        this.toastr.error('Error al obtener los tipos de transferencia:', error);
      }
    );
  }

  crearEgresoTransferencia(idPresupuestoEjecucion: number, descripcion: string, porcentaje: number, idTipoTransferencia: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(descripcion);
      console.log(porcentaje);
      console.log(idTipoTransferencia);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        descripcion: descripcion,
        porcentaje: porcentaje,
        idTipoTransferencia: idTipoTransferencia
      };
      console.log(params);
      this.egresosService.postEgresoTransferencia(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          this.toastr.success("Egreso guardado exitosamente");
          this.obtenerEgresosTransferenciaPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      this.toastr.error('Error al crear el egreso:', (error as Error).message || String(error));
    }
  }

  editarEgresoTransferencia(id: number, descripcion: string, porcentaje: number, idTipoTransferencia: number) {
    try {
      console.log(id);
      console.log(descripcion);
      console.log(porcentaje);
      console.log(idTipoTransferencia);

      this.egresosService.editEgresoTransferencia(id, descripcion, porcentaje, idTipoTransferencia).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          this.toastr.success("Egreso editado exitosamente");
          this.obtenerEgresosTransferenciaPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {
      this.toastr.error('Error al editar el egreso:', (error as Error).message || String(error));

    }

  }

  eliminarEgresoTransferencia(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoTransferencia(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          this.toastr.success("Egreso eliminado exitosamente");
          this.obtenerEgresosTransferenciaPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {
      this.toastr.error('Error al eliminar el egreso:', (error as Error).message || String(error));
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
          this.editarEgresoTransferencia(egreso.id, result.descripcion, result.porcentaje, result.entidadPerteneciente);
        } else {
          console.log("Crea egreso");
          this.crearEgresoTransferencia(this.idPresupuesto, result.descripcion, result.porcentaje, result.entidadPerteneciente);
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
        this.eliminarEgresoTransferencia(egresoId);
      }
    });


  }

}
