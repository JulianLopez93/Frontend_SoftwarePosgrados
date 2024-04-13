import { Component } from '@angular/core';
import { TiposService } from '@app/services/tipos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-tipos-transferencia',
  templateUrl: './listar-tipos-transferencia.component.html',
  styleUrls: ['./listar-tipos-transferencia.component.css']
})
export class ListarTiposTransferenciaComponent {

  tipos: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];
  form!: FormGroup;
  nombre:string='';
  p: number = 1;
  searchText: string = '';
  filteredTipos: any[] = [];

  constructor(private tiposService: TiposService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerTiposTransferencia();
  }


  obtenerTiposTransferencia() {
    this.tiposService.getTiposTransferencia().subscribe(
      (tipos) => {
        this.tipos = tipos;
        this.applyFilter();

      },
      (error) => {
        console.error('Error al obtener los tipos:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredTipos = this.tipos.filter(tipo =>
        tipo.nombreTipo.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredTipos = this.tipos;
    }
  }

  editarTipoTransferencia(id:string, nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.editTipoTransferencia(id, nombreTipo).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de transferencia editado");
          this.obtenerTiposTransferencia();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarTipoTransferencia(id:string)
  {
    try
    {
      console.log(id);
      this.tiposService.deleteTipoTransferencia(id).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de transferencia eliminado");
          this.obtenerTiposTransferencia();
        }

      });
    }
    catch(error)
      {

      }

  }
  crearTipoTransferencia(nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.postTipoTransferencia(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de transferencia creado");
          this.obtenerTiposTransferencia();
        }

      });
    }
    catch(error)
      {

      }
  }

  openCreateDialog(modulo:string, tipo?: any): void {
    console.log(tipo);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'300px',
      data: { 
              modulo:modulo,
              nombreTipo: tipo ? tipo.nombreTipo : '', 
              isEdit: !!tipo,
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (tipo) {
          console.log("Edita tipo");
          this.editarTipoTransferencia(tipo.id, result.nombre);
        } else {
          console.log("Crea tipo");
          this.crearTipoTransferencia(result.nombre);
        }
      }

    });
  }
  openDeleteDialog(id: string, modulo:string):void{
    const dialogRef = this.dialog.open(PopupEliminarComponent , {
      width:'300px',
      data:{
        modulo: modulo,
        id: id

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarTipoTransferencia(id);
      }
    });

  }

}
