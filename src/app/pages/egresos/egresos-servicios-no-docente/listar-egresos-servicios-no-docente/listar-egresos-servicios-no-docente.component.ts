import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EgresosService } from '@app/services/egresos.service';
import { TiposService } from '@app/services/tipos.service';
import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';


@Component({
  selector: 'app-listar-egresos-servicios-no-docente',
  templateUrl: './listar-egresos-servicios-no-docente.component.html',
  styleUrls: ['./listar-egresos-servicios-no-docente.component.css']
})
export class ListarEgresosServiciosNoDocenteComponent {

  egresos: any[] = [];
  displayedColumns: string[] = ['servicio','valor_unitario','cantidad','tipo_costo','acciones'];
  form!: FormGroup;
  nombre:string='';
  p: number = 1;
  searchText: string = '';
  filteredEgresos: any[] = [];
  idPresupuesto:any;
  listadoTipoPerteneciente:any[] = [];

  constructor(private egresosService: EgresosService,
    private tiposService: TiposService,
    public dialog: MatDialog) {}

    ngOnInit() {

      this.idPresupuesto = localStorage.getItem('idPresupuesto');
      console.log(this.idPresupuesto);
      //localStorage.removeItem('idPresupuesto');
      this.obtenerEgresosServNoDocentePorPresupuesto();
      this.obtenerTiposCosto();
      //this.obtenerIngresos();
      //this.obtenerPresupuestos();
    }

    obtenerEgresosServNoDocentePorPresupuesto()
    {
      this.egresosService.getEgresosServiciosNoDocentePorPresupuesto(this.idPresupuesto).subscribe((result) =>{
        console.log(result);
        this.egresos = result;
        this.applyFilter();
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
          egreso.servicio.toLowerCase().includes(this.searchText.toLowerCase())
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
  
    crearEgresosServNoDocente(idPresupuestoEjecucion: number, servicio: string, valorUnitario: number, cantidad: number, idTipoCosto:number) {
      try {
        console.log(idPresupuestoEjecucion);
        console.log(servicio);
        console.log(valorUnitario);
        console.log(cantidad);
        console.log(idTipoCosto);
        const params = {
          idPresupuestoEjecucion: idPresupuestoEjecucion,
          servicio: servicio,
          valorUnitario: valorUnitario,
          cantidad: cantidad,
          idTipoCosto: idTipoCosto
        };
        console.log(params);
        this.egresosService.postEgresoServiciosNoDocente(params).subscribe((result: any) => {
          console.log(result);
          if (result == "OK") {
            console.log("Egreso guardado");
            this.obtenerEgresosServNoDocentePorPresupuesto();
          }
        });
      } catch (error) {
        console.error('Error al crear el egreso:', error);
      }
    }
    editarEgresosServNoDocente(id:number, servicio: string, valorUnitario: number, cantidad: number, idTipoCosto:number)
    {
      try
      {
        console.log(id);
        console.log(servicio);
        console.log(valorUnitario);
        console.log(cantidad);
        console.log(idTipoCosto);
  
        this.egresosService.editEgresoServiciosNoDocente(id, servicio, valorUnitario, cantidad, idTipoCosto).subscribe((result:any) => {
          console.log(result);
          if (result = "OK")
          {
            console.log("Egreso editado");
            this.obtenerEgresosServNoDocentePorPresupuesto();
          }
  
        });
      }
      catch(error)
        {
  
        }
  
    }
  
    eliminarEgresosServNoDocente(id:string)
    {
      try
      {
        console.log(id);
        this.egresosService.deleteEgresoServiciosNoDocente(id).subscribe((result:any) => {
          console.log(result);
          if (result = "OK")
          {
            console.log("egreso eliminado");
            this.obtenerEgresosServNoDocentePorPresupuesto();
          }
  
        });
      }
      catch(error)
        {
  
        }
  
    }
  
    openCreateDialog(modulo:string, egreso?: any): void {
      console.log(egreso);
      console.log(this.idPresupuesto);
  
      const dialogRef = this.dialog.open(PopupCrearEditarEgresoComponent , {
        width:'350px',
        data: {
                modulo:modulo,
                servicio: egreso ? egreso.servicio : '',
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
            this.editarEgresosServNoDocente(egreso.id, result.servicio, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
          } else {
            console.log("Crea egreso");
            this.crearEgresosServNoDocente(this.idPresupuesto, result.servicio, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
          }
        }
  
      });
    }
  
    openDeleteDialog(egresoId: string, modulo:string):void{
      const dialogRef = this.dialog.open(PopupEliminarComponent , {
        width:'300px',
        data:{
          modulo: modulo,
          id: egresoId
  
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.eliminarEgresosServNoDocente(egresoId);
        }
      });
  
  
    }

}
