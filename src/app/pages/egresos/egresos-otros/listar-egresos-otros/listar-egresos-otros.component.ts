import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-egresos-otros',
  templateUrl: './listar-egresos-otros.component.html',
  styleUrls: ['./listar-egresos-otros.component.css']
})
export class ListarEgresosOtrosComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['concepto', 'valor_unitario', 'cantidad', 'tipo_costo', 'valorTotal', 'acciones'];
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
    this.obtenerEgresosOtrosPorPresupuesto();
    this.obtenerTiposCosto();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosOtros(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        this.toastr.error('Error al obtener el total de egresos otros:', error);
      }
    )
  }

  obtenerEgresosOtrosPorPresupuesto() {
    this.egresosService.getEgresosOtrosPorPresupuesto(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.egresos = result;
      this.applyFilter();
      this.obtenerTotalEgresos();
    },
      (error) => {
        this.toastr.error('Error al obtener los egresos:', error);
      }
    )
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredEgresos = this.egresos.filter(egreso =>
        egreso.tipoCosto.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.concepto.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }

  obtenerTiposCosto() {
    this.tiposService.getTiposCosto().subscribe(
      (result) => {
        this.listadoTipoPerteneciente = result;

      },
      (error) => {
        this.toastr.error('Error al obtener los tipos de costo:', error);
      }
    );
  }

  crearEgresoOtros(idPresupuestoEjecucion: number, concepto: string, valorUnitario: number, cantidad: number, idTipoCosto: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(concepto);
      console.log(valorUnitario);
      console.log(cantidad);
      console.log(idTipoCosto);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        concepto: concepto,
        valorUnitario: valorUnitario,
        cantidad: cantidad,
        idTipoCosto: idTipoCosto
      };
      console.log(params);
      this.egresosService.postEgresoOtros(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          this.toastr.success("Egreso guardado exitosamente");
          this.obtenerEgresosOtrosPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
        this.toastr.error('Error al crear el egreso:', (error as Error).message || String(error));
    }
  }
  editarEgresoOtros(id: number, concepto: string, valorUnitario: number, cantidad: number, idTipoCosto: number) {
    try {
      console.log(id);
      console.log(concepto);
      console.log(valorUnitario);
      console.log(cantidad);
      console.log(idTipoCosto);

      this.egresosService.editEgresoOtros(id, concepto, valorUnitario, cantidad, idTipoCosto).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          this.toastr.success("Egreso editado exitosamente");
          this.obtenerEgresosOtrosPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {
      this.toastr.error('Error al editar el egreso:', (error as Error).message || String(error));
    }

  }

  eliminarEgresoOtros(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoOtros(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          this.toastr.success("Egreso eliminado exitosamente");
          this.obtenerEgresosOtrosPorPresupuesto();
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
        concepto: egreso ? egreso.concepto : '',
        valorUnitario: egreso ? egreso.valorUnitario : '',
        cantidad: egreso ? egreso.cantidad : '',
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
          this.editarEgresoOtros(egreso.id, result.concepto, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
        } else {
          console.log("Crea egreso");
          this.crearEgresoOtros(this.idPresupuesto, result.concepto, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
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
        this.eliminarEgresoOtros(egresoId);
      }
    });


  }

}
