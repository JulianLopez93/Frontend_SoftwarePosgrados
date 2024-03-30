import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartamentosService } from '@app/services/departamentos.service';
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
  displayedColumns: string[] = ['nombre','departamento','acciones'];
  listadoDepartamentos:any[] = [];
  form!: FormGroup;
  nombre:string='';
  programas: any[] = [];
  
  constructor(private programasService: ProgramasService,
    private departamentosService: DepartamentosService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerProgramas();
    this.obtenerDepartamentos();
  }


  obtenerProgramas() {
    this.programasService.getProgramas().subscribe(
      (result) => {
        console.log(result);
        this.programas= result;

      },
      (error) => {
        console.error('Error al obtener los programas:', error);
      }
    );
  }

  editarPrograma(idPrograma:string, nombre:string, idDepartamento:number)
  {
    try
    {
      console.log(idPrograma);
      console.log(idDepartamento)
      console.log(nombre);
      const params = 
      {
        nombre: nombre,
        idDepartamento: idDepartamento
      }
      console.log(params);
      this.programasService.editPrograma(nombre, idPrograma, idDepartamento).subscribe((result:any) => {
        console.log(result);
        if (result = "Programa editado")
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
        if (result = "Programa eliminado")
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
  crearPrograma(nombre:string, departamento:any)
  {
    try
    {
      console.log(nombre);
      console.log(departamento);
      const params = 
      {
        nombre: nombre,
        idDepartamento: departamento
      }
      console.log(params);
      this.programasService.postPrograma(params).subscribe((result:any) => {
        console.log(result);
        if (result = "Programa guardado")
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

  
  openCreateDialog(modulo:string, programa?: any ): void {
    console.log(programa);    
    
    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: { 
              modulo:modulo,
              nombre: programa ? programa.nombre : '', 
              isEdit: !!programa,
              listaDepartamentos: this.listadoDepartamentos
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

  obtenerDepartamentos() {
    this.departamentosService.getDepartamentos().subscribe(
      (result) => {
        this.listadoDepartamentos = result;

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

}
