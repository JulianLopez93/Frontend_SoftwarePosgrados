import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DescuentosService } from '@app/services/descuentos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-descuentos',
  templateUrl: './listar-descuentos.component.html',
  styleUrls: ['./listar-descuentos.component.css']
})
export class ListarDescuentosComponent {

  descuentos: any[] = [];
  displayedColumns: string[] = ['cantidad_estudiantes', 'valor', 'numero_periodos', 'tipo_descuento', 'totalDescuento', 'acciones'];
  //listadoPresupuestos:any[] = [];
  form!: FormGroup;
  nombre: string = '';
  p: number = 1;
  searchText: string = '';
  filteredDescuentos: any[] = [];
  idPresupuesto: any;
  listadoTiposDescuento: any[] = [];
  totalEgresos = 0;

  constructor(private descuentosService: DescuentosService,
    private tiposService: TiposService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.idPresupuesto = sessionStorage.getItem('idPresupuesto');
    console.log(this.idPresupuesto);
    //localStorage.removeItem('idPresupuesto');
    this.obtenerDescuentosPorPresupuesto();
    this.obtenerTiposDescuento();
    //this.obtenerIngresos();
    //this.obtenerPresupuestos();
  }

  obtenerTotalEgresos() {
    this.descuentosService.getTotalEgresosDescuentos(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.totalEgresos = result;

    },
      (error) => {
        console.error('Error al obtener el total de egresos generales:', error);
      }
    )
  }

  obtenerDescuentosPorPresupuesto() {
    this.descuentosService.getDescuentosPorPresupuesto(this.idPresupuesto).subscribe((result) => {
      console.log(result);
      this.descuentos = result;
      this.applyFilter();
      this.obtenerTotalEgresos();
    },
      (error) => {
        console.error('Error al obtener los ingresos:', error);
      }
    )
  }

  obtenerTiposDescuento() {
    this.tiposService.getTiposDescuento().subscribe(
      (result) => {
        this.listadoTiposDescuento = result;

      },
      (error) => {
        console.error('Error al obtener los tipos de descuento:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredDescuentos = this.descuentos.filter(descuento =>
        descuento.tipoDescuento.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredDescuentos = this.descuentos;
    }
  }

  crearDescuento(idPresupuestoEjecucion: number, numEstudiantes: number, valor: number, numPeriodos: number, idTipoDescuento: number) {
    try {
      console.log(idPresupuestoEjecucion);
      console.log(numEstudiantes);
      console.log(valor);
      console.log(numPeriodos);
      console.log(idTipoDescuento);
      const params = {
        idPresupuestoEjecucion: idPresupuestoEjecucion,
        numEstudiantes: numEstudiantes,
        valor: valor,
        numPeriodos: numPeriodos,
        idTipoDescuento: idTipoDescuento
      };
      console.log(params);
      this.descuentosService.postDescuento(params).subscribe((result: any) => {
        console.log(result);
        if (result == "OK") {
          console.log("Descuento guardado");
          this.obtenerDescuentosPorPresupuesto();
          this.obtenerTotalEgresos();
        }
      });
    } catch (error) {
      console.error('Error al crear el descuento:', error);
    }
  }

  editarDescuento(id: number, numEstudiantes: number, valor: number, numPeridodos: number, idTipoDescuento: number) {
    try {
      console.log(id);
      console.log(numEstudiantes);
      console.log(numPeridodos);
      console.log(valor);
      console.log(idTipoDescuento);

      this.descuentosService.editDescuento(id, numEstudiantes, valor, numPeridodos, idTipoDescuento).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Descuento editado");
          this.obtenerDescuentosPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  eliminarDescuento(id: string) {
    try {
      console.log(id);
      this.descuentosService.deleteDescuento(id).subscribe((result: any) => {
        console.log(result);
        if (result = "OK") {
          console.log("Descuento eliminado");
          this.obtenerDescuentosPorPresupuesto();
          this.obtenerTotalEgresos();
        }

      });
    }
    catch (error) {

    }

  }

  openCreateDialog(modulo: string, descuento?: any): void {
    console.log(descuento);
    console.log(this.idPresupuesto);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent, {
      width: '350px',
      data: {
        modulo: modulo,
        numEstudiantes: descuento ? descuento.numEstudiantes : '',
        isEdit: !!descuento,
        listaTiposDescuento: this.listadoTiposDescuento
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (descuento) {
          console.log("Edita descuento");
          this.editarDescuento(descuento.id, result.numEstudiantes, result.valor, result.numPeriodos, result.entidadPerteneciente);
        } else {
          console.log("Crea descuento");
          this.crearDescuento(this.idPresupuesto, result.numEstudiantes, result.valor, result.numPeriodos, result.entidadPerteneciente);
        }
      }

    });
  }

  openDeleteDialog(descuentoId: string, modulo: string): void {
    const dialogRef = this.dialog.open(PopupEliminarComponent, {
      width: '300px',
      data: {
        modulo: modulo,
        id: descuentoId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDescuento(descuentoId);
      }
    });


  }
}
