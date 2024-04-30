import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-otros-servicios-docente',
  templateUrl: './listar-otros-servicios-docente.component.html',
  styleUrls: ['./listar-otros-servicios-docente.component.css']
})
export class ListarOtrosServiciosDocenteComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['servicio', 'descripcion', 'numHoras', 'valor_total', 'tipo_costo', 'acciones'];
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
    this.obtenerEgresosOtrosServDocentePorPresupuesto();
    this.obtenerTiposCosto();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosOtrosServiciosDocentes(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos otros serv docentes:', error);
      }
    )
  }

  obtenerEgresosOtrosServDocentePorPresupuesto() {
    this.egresosService.getEgresosOtrosServiciosDocentePorPresupuesto(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.egresos = result;
      this.applyFilter();
      this.obtenerTotalEgresos();
    },
      (error) => {
        console.error('Error al obtener los egresos:', error);
      }
    )
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredEgresos = this.egresos.filter(egreso =>
        egreso.tipoCosto.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.servicio.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
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
        console.error('Error al obtener los tipos de costo:', error);
      }
    );
  }

  crearEgresosOtrosServDocente(idPresupuestoEjecucion: number, servicio: string, descripcion: string, numHoras: number, valorTotal: number, idTipoCosto: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(servicio);
      console.log(descripcion);
      console.log(numHoras);
      console.log(valorTotal);
      console.log(idTipoCosto);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        servicio: servicio,
        descripcion: descripcion,
        numHoras: numHoras,
        valorTotal: valorTotal,
        idTipoCosto: idTipoCosto
      };
      console.log(params);
      this.egresosService.postEgresoOtrosServiciosDocente(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Egreso guardado");
          this.obtenerEgresosOtrosServDocentePorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  }
  editarEgresosOtrosServDocente(id: number, servicio: string, descripcion: string, numHoras: number, valorTotal: number, idTipoCosto: number) {
    try {
      console.log(id);
      console.log(servicio);
      console.log(descripcion);
      console.log(numHoras);
      console.log(valorTotal);
      console.log(idTipoCosto);

      this.egresosService.editEgresoOtrosServiciosDocente(id, servicio, descripcion, numHoras, valorTotal, idTipoCosto).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Egreso editado");
          this.obtenerEgresosOtrosServDocentePorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  eliminarEgresosOtrosServDocente(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoOtrosServiciosDocente(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("egreso eliminado");
          this.obtenerEgresosOtrosServDocentePorPresupuesto();
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
        servicio: egreso ? egreso.servicio : '',
        descripcion: egreso ? egreso.descripcion : '',
        numHoras: egreso ? egreso.numHoras : '',
        valorTotal: egreso ? egreso.valorTotal : '',
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
          this.editarEgresosOtrosServDocente(egreso.id, result.servicio, result.descripcion,
            result.numHoras, result.valorTotal, result.entidadPerteneciente);
        } else {
          console.log("Crea egreso");
          this.crearEgresosOtrosServDocente(this.idPresupuesto, result.servicio,
            result.descripcion, result.numHoras, result.valorTotal, result.entidadPerteneciente);
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
        this.eliminarEgresosOtrosServDocente(egresoId);
      }
    });


  }

}
