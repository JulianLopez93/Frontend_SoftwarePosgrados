import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FacultadesServicioService } from '@app/services/facultades-servicio.service';
import { ProgramasService } from '@app/services/programas.service';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';

@Component({
  selector: 'app-listar-programas',
  templateUrl: './listar-programas.component.html',
  styleUrls: ['./listar-programas.component.css']
})
export class ListarProgramasComponent {
  departamentos: any[] = [];
  displayedColumns: string[] = ['nombre','facultad','acciones'];
  listadoFacultades:any[] = [];

  form!: FormGroup;
  nombre:string='';
  programas: any[] = [];
  p: number = 1; //Paginación
  searchText: string = '';
  filteredProgramas: any[] = [];

  constructor(private programasService: ProgramasService,
    private facultadesService: FacultadesServicioService,
              public dialog: MatDialog) {}

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
        console.error('Error al obtener las cohortes:', error);
      }
    );
  }

  obtenerFacultades() {
    this.facultadesService.getFacultades().subscribe(
      (result) => {
        this.listadoFacultades = result;

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredProgramas = this.programas.filter(programa =>
        programa.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        programa.departamento.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        programa.departamento.facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredProgramas = this.programas;
    }
  }

  crearPrograma(nombre:string, facultad:any)
  {
    try
    {
      console.log(nombre);
      console.log(facultad);
      const params =
      {
        nombre: nombre,
        idFacultad: facultad
      }
      console.log(params);
      this.programasService.postPrograma(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Programa guardado");
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
      {

      }
  }

  editarPrograma(idPrograma:string, nombre:string, idFacultad:number)
  {
    try
    {
      console.log(idPrograma);
      console.log(idFacultad)
      console.log(nombre);
      const params =
      {
        nombre: nombre,
        idFacultad: idFacultad
      }
      console.log(params);
      this.programasService.editPrograma(nombre, idPrograma, idFacultad).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Programa editado");
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
      {

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
          console.log("Programa eliminado");
          this.obtenerProgramas();
        }

      });
    }
    catch(error)
      {

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
              listaFacultades: this.listadoFacultades
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (programa) {
          console.log("Edita Programa");
          this.editarPrograma(programa.id, result.nombre, result.entidadPerteneciente);
        } else {
          console.log("Crea programa");
           this.crearPrograma(result.nombre, result.entidadPerteneciente);
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
