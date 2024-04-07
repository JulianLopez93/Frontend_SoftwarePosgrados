import { Component } from '@angular/core';
import { TiposService } from '@app/services/tipos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';

@Component({
  selector: 'app-listar-tipos-compensacion',
  templateUrl: './listar-tipos-compensacion.component.html',
  styleUrls: ['./listar-tipos-compensacion.component.css']
})
export class ListarTiposCompensacionComponent {
  
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
    this.obtenerTiposCompensacion();
  }


  obtenerTiposCompensacion() {
    this.tiposService.getTiposCompensacion().subscribe(
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

  editarTipoCompensacion(id:string, nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.editTipoCompensacion(id, nombreTipo).subscribe((result:any) => {
        console.log(result);
        if (result = "Tipo de compensacion editado")
        {
          console.log("Tipo de compensacion editado");
          this.obtenerTiposCompensacion();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarTipoCompensacion(id:string)
  {
    try
    {
      console.log(id);
      this.tiposService.deleteTipoCompensacion(id).subscribe((result:any) => {
        console.log(result);
        if (result = "Tipo de compensacion eliminado")
        {
          console.log("Tipo de compensacion eliminado");
          this.obtenerTiposCompensacion();
        }

      });
    }
    catch(error)
      {

      }

  }
  crearTipoCompensacion(nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.postTiposCompensacion(params).subscribe((result:any) => {
        console.log(result);
        if (result = "Tipo de compensacion guardado")
        {
          console.log("Tipo de compensacion creado");
          this.obtenerTiposCompensacion();
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
          this.editarTipoCompensacion(tipo.id, result.nombre);
        } else {
          console.log("Crea tipo");
          this.crearTipoCompensacion(result.nombre);
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
        this.eliminarTipoCompensacion(id);
      }
    });

  }

}
