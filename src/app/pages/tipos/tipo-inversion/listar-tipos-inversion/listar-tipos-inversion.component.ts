import { Component } from '@angular/core';
import { TiposService } from '@app/services/tipos.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-tipos-inversion',
  templateUrl: './listar-tipos-inversion.component.html',
  styleUrls: ['./listar-tipos-inversion.component.css']
})
export class ListarTiposInversionComponent {

  tipos: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];
  form!: FormGroup;
  nombre:string='';
  p: number = 1;
  searchText: string = '';
  filteredTipos: any[] = [];

  constructor(private tiposService: TiposService,
              public dialog: MatDialog,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.obtenerTiposInversion();
  }


  obtenerTiposInversion() {
    this.tiposService.getTiposInversion().subscribe(
      (tipos) => {
        this.tipos = tipos;
        this.applyFilter();

      },
      (error) => {
        this.toastr.error('Error al obtener los tipos:', error);
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

  crearTipoInversion(nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.postTipoInversion(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success("Tipo de inversion creado exitosamente");
          this.obtenerTiposInversion();
        }

      });
    }
    catch(error)
    {
      this.toastr.error('Error al crear el tipo de inversion:', (error as Error).message || String(error));
    }
  }

  editarTipoInversion(id:string, nombreTipo:string)
  {
    try
    {
      console.log(nombreTipo);
      const params =
      {
        nombreTipo: nombreTipo
      }
      console.log(params);
      this.tiposService.editTipoInversion(id, nombreTipo).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success("Tipo de inversion editado exitosamente");
          this.obtenerTiposInversion();
        }

      });
    }
    catch(error)
    {
      this.toastr.error('Error al editar el tipo de inversion:', (error as Error).message || String(error));
    }

  }
  eliminarTipoInversion(id:string)
  {
    try
    {
      console.log(id);
      this.tiposService.deleteTipoInversion(id).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success("Tipo de inversion eliminado exitosamente");
          this.obtenerTiposInversion();
        }

      });
    }
    catch(error)
    {
      this.toastr.error('Error al eliminar el tipo de inversion:', (error as Error).message || String(error));
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
          this.editarTipoInversion(tipo.id, result.nombre);
        } else {
          console.log("Crea tipo");
          this.crearTipoInversion(result.nombre);
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
        this.eliminarTipoInversion(id);
      }
    });

  }
}
