import { Component } from '@angular/core';
import { TiposService } from '@app/services/tipos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-tipos-descuento',
  templateUrl: './listar-tipos-descuento.component.html',
  styleUrls: ['./listar-tipos-descuento.component.css']
})
export class ListarTiposDescuentoComponent {

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
    this.obtenerTiposDescuento();
  }


  obtenerTiposDescuento() {
    this.tiposService.getTiposDescuento().subscribe(
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

  editarTipoDescuento(id:string, nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.editTipoDescuento(id, nombreTipo).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de descuento editado");
          this.obtenerTiposDescuento();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarTipoDescuento(id:string)
  {
    try
    {
      console.log(id);
      this.tiposService.deleteTipoDescuento(id).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de descuento eliminado");
          this.obtenerTiposDescuento();
        }

      });
    }
    catch(error)
      {

      }

  }
  crearTipoDescuento(nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.postTipoDescuento(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Tipo de descuento creado");
          this.obtenerTiposDescuento();
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
          this.editarTipoDescuento(tipo.id, result.nombre);
        } else {
          console.log("Crea tipo");
          this.crearTipoDescuento(result.nombre);
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
        this.eliminarTipoDescuento(id);
      }
    });

  }

}
