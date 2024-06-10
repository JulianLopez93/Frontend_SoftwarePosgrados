import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FacultadesServicioService } from '@app/services/facultades-servicio.service';
import { ProgramasService } from '@app/services/programas.service';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-programas',
  templateUrl: './listar-programas.component.html',
  styleUrls: ['./listar-programas.component.css']
})
export class ListarProgramasComponent {
  departamentos: any[] = [];
  displayedColumns: string[] = ['nombre','facultad', 'priorizado', 'acciones'];
  listadoFacultades:any[] = [];

  form!: FormGroup;
  nombre:string='';
  programas: any[] = [];
  p: number = 1; //Paginación
  searchText: string = '';
  filteredProgramas: any[] = [];

  constructor(private programasService: ProgramasService,
    private facultadesService: FacultadesServicioService,
              public dialog: MatDialog,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.obtenerProgramas();
    this.obtenerFacultades();
  }


  obtenerProgramas() {
    this.programasService.getProgramas().subscribe(
      (result) => {
        console.log(result);
        this.programas = result;
        this.applyFilter();
      },
      (error) => {
        this.toastr.error('Error al obtener los programas:', error);
      }
    );
  }

  obtenerFacultades() {
    this.facultadesService.getFacultades().subscribe(
      (result) => {
        this.listadoFacultades = result;

      },
      (error) => {
        this.toastr.error('Error al obtener las facultades:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredProgramas = this.programas.filter(programa =>
        programa.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        programa.facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredProgramas = this.programas;
    }
  }

  crearPrograma(nombre:string, facultad:any, esPriorizado:boolean)
  {
    try
    {
      console.log(nombre);
      console.log(facultad);
      console.log(esPriorizado);
      const params =
      {
        nombre: nombre,
        idFacultad: facultad,
        esPriorizado: esPriorizado
      }
      console.log(params);
      this.programasService.postPrograma(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success('Programa creado exitosamente');
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
    {
      this.toastr.error('Error al crear el programa:', (error as Error).message || String(error));

    }
  }

  editarPrograma(idPrograma:string, nombre:string, idFacultad:number, esPriorizado:boolean)
  {
    try
    {
      console.log(idPrograma);
      console.log(idFacultad)
      console.log(nombre);
      console.log(esPriorizado);
      const params =
      {
        nombre: nombre,
        idFacultad: idFacultad,
        esPriorizado: esPriorizado
      }
      console.log(params);
      this.programasService.editPrograma(nombre, idPrograma, idFacultad, esPriorizado).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success('Programa editado exitosamente');
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
      {
        this.toastr.error('Error al editar el programa:', (error as Error).message || String(error));
      }

  }

  eliminarPrograma(idPrograma:string)
  {
    try
    {
      console.log(idPrograma);
      this.programasService.deletePrograma(idPrograma).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          this.toastr.success('Programa eliminado exitosamente');
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
      {
        this.toastr.error('Error al eliminar el programa:', (error as Error).message || String(error));
      }

  }
  


  openCreateDialog(modulo:string, programa?: any ): void {
    console.log(programa);

    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: {
              modulo:modulo,
              nombre: programa ? programa.nombre : '',
              isEdit: !!programa,
              listaFacultades: this.listadoFacultades,
              isPriorizado: programa ? programa.isPriorizado : ''
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (programa) {
          console.log("Edita Programa");
          this.editarPrograma(programa.id, result.nombre, result.entidadPerteneciente, result.esPriorizado);
        } else {
          console.log("Crea programa");
           this.crearPrograma(result.nombre, result.entidadPerteneciente, result.esPriorizado);
        }
      }

    });
  }

  openDeleteDialog(programaId: string, modulo:string):void{
    const dialogRef = this.dialog.open(PopupEliminarComponent , {
      width:'300px',
      data:{
        modulo: modulo,
        id: programaId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarPrograma(programaId);
      }
    });


  }

  

}
