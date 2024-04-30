import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-egresos-servicios-docentes',
  templateUrl: './listar-egresos-servicios-docentes.component.html',
  styleUrls: ['./listar-egresos-servicios-docentes.component.css']
})
export class ListarEgresosServiciosDocentesComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['nombreMateria', 'esDocentePlanta', 'nombreDocente'
    , 'escalafon', 'titulo', 'horasTeoricasMat', 'horasPracticasMat'
    , 'valorHoraProfesor', 'tipoCompensacion', 'totalPagoProfesor', 'acciones'];
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
    this.obtenerEgresosServiciosDocentesPorPresupuesto();
    this.obtenerTiposCompensacion();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.egresosService.getTotalEgresosServiciosDocentes(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos serv docentes:', error);
      }
    )
  }

  obtenerEgresosServiciosDocentesPorPresupuesto() {
    this.egresosService.getEgresosServiciosDocentesPorPresupuesto(this.idPresupuesto).subscribe((result) => {
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
        egreso.tipoInversion.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase()) ||
        egreso.nombreMateria.toLowerCase().includes(this.searchText.toLowerCase())
        || egreso.nombreDocente.toLowerCase().includes(this.searchText.toLowerCase())
        || egreso.escalafon.toLowerCase().includes(this.searchText.toLowerCase())
        || egreso.titulo.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEgresos = this.egresos;
    }
  }

  obtenerTiposCompensacion() {
    this.tiposService.getTiposCompensacion().subscribe(
      (result) => {
        this.listadoTipoPerteneciente = result;

      },
      (error) => {
        console.error('Error al obtener los tipos de compensación:', error);
      }
    );
  }

  crearEgresoServiciosDocentes(idPresupuestoEjecucion: number,
    nombreMateria: string, esDocentePlanta: boolean, nombreDocente: string,
    escalafon: string, titulo: string, horasTeoricasMat: number,
    horasPracticasMat: number, valorHoraProfesor: number, idTipoCompensacion: number
  ) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(nombreMateria);
      console.log(esDocentePlanta);
      console.log(nombreDocente);
      console.log(escalafon);
      console.log(titulo);
      console.log(horasTeoricasMat);
      console.log(horasPracticasMat);
      console.log(valorHoraProfesor);
      console.log(idTipoCompensacion);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        nombreMateria: nombreMateria,
        esDocentePlanta: esDocentePlanta,
        nombreDocente: nombreDocente,
        escalafon: escalafon,
        titulo: titulo,
        horasTeoricasMat: horasTeoricasMat,
        horasPracticasMat: horasPracticasMat,
        valorHoraProfesor: valorHoraProfesor,
        idTipoCompensacion: idTipoCompensacion
      };
      console.log(params);
      this.egresosService.postEgresoServiciosDocentes(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Egreso guardado");
          this.obtenerEgresosServiciosDocentesPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el egreso:', error);
    }
  }
  editarEgresoServiciosDocentes(id: number, nombreMateria: string,
    esDocentePlanta: boolean, nombreDocente: string,
    escalafon: string, titulo: string, horasTeoricasMat: number,
    horasPracticasMat: number, valorHoraProfesor: number,
    idTipoCompensacion: number) {
    try {
      console.log(id);
      console.log(nombreMateria);
      console.log(esDocentePlanta);
      console.log(nombreDocente);
      console.log(escalafon);
      console.log(titulo);
      console.log(horasTeoricasMat);
      console.log(horasPracticasMat);
      console.log(valorHoraProfesor);
      console.log(idTipoCompensacion);

      this.egresosService.editEgresoServiciosDocentes(id, nombreMateria,
        esDocentePlanta, nombreDocente, escalafon, titulo, horasTeoricasMat,
        horasPracticasMat, valorHoraProfesor, idTipoCompensacion
      ).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Egreso editado");
          this.obtenerEgresosServiciosDocentesPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  eliminarEgresoServiciosDocentes(id: string) {
    try {
      console.log(id);
      this.egresosService.deleteEgresoServiciosDocentes(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("egreso eliminado");
          this.obtenerEgresosServiciosDocentesPorPresupuesto();
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
        nombreMateria: egreso ? egreso.nombreMateria : '',
        esDocentePlanta: egreso ? (egreso.esDocentePlanta ? 'Sí' : 'No') : '',
        nombreDocente: egreso ? egreso.nombreDocente : '',
        escalafon: egreso ? egreso.escalafon : '',
        titulo: egreso ? egreso.titulo : '',
        horasTeoricasMat: egreso ? egreso.horasTeoricasMat : '',
        horasPracticasMat: egreso ? egreso.horasPracticasMat : '',
        valorHoraProfesor: egreso ? egreso.valorHoraProfesor : '',
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
          this.editarEgresoServiciosDocentes(egreso.id, result.nombreMateria,
            result.esDocentePlanta, result.nombreDocente, result.escalafon,
            result.titulo, result.horasTeoricasMat, result.horasPracticasMat,
            result.valorHoraProfesor, result.entidadPerteneciente);
        } else {
          console.log("Crea egreso");
          this.crearEgresoServiciosDocentes(this.idPresupuesto, result.nombreMateria,
            result.esDocentePlanta, result.nombreDocente, result.escalafon,
            result.titulo, result.horasTeoricasMat, result.horasPracticasMat,
            result.valorHoraProfesor, result.entidadPerteneciente);
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
        this.eliminarEgresoServiciosDocentes(egresoId);
      }
    });


  }


}
