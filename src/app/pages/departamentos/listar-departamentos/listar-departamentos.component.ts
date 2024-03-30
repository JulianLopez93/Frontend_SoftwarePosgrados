import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DepartamentosService } from '@app/services/departamentos.service';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';
import { PopupEliminarComponent } from '@app/shared/popup-eliminar/popup-eliminar.component';
import { FacultadesServicioService } from '@app/services/facultades-servicio.service';

@Component({
  selector: 'app-listar-departamentos',
  templateUrl: './listar-departamentos.component.html',
  styleUrls: ['./listar-departamentos.component.css']
})
export class ListarDepartamentosComponent {
  
  departamentos: any[] = [];
  displayedColumns: string[] = ['nombre','facultad','acciones'];
  listadoFacultades:any[] = [];
  form!: FormGroup;
  nombre:string='';
  
  constructor(private departamentosService: DepartamentosService,
    private facultadesService: FacultadesServicioService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerDepartamentos();
    this.obtenerFacultades();
  }


  obtenerDepartamentos() {
    this.departamentosService.getDepartamentos().subscribe(
      (result) => {
        console.log(result);
        this.departamentos = result;

      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  editarDepartamento(idDepartamento:string, nombre:string, idFacultad:number)
  {
    try
    {
      console.log(idDepartamento)
      console.log(nombre);
      console.log(idFacultad);
      const params = 
      {
        nombre: nombre,
        idFacultad: idFacultad
      }
      console.log(params);
      this.departamentosService.editDepartamento(nombre, idDepartamento, idFacultad).subscribe((result:any) => {
        console.log(result);
        if (result = "Departamento editado")
        {
          console.log("Departamento editado");
          this.obtenerDepartamentos();
        }

      });  
    }
    catch(error)
      {
        
      }  

  }
  eliminarDepartamento(idDepartamento:string)
  {
    try
    {
      console.log(idDepartamento);
      this.departamentosService.deleteDepartamento(idDepartamento).subscribe((result:any) => {
        console.log(result);
        if (result = "Departamento eliminado")
        {
          console.log("Departamento eliminado");
          this.obtenerDepartamentos();
        }

      });  
    }
    catch(error)
      {
        
      }
    
  }
  crearDepartamento(nombre:string, facultad:any)
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
      this.departamentosService.postDepartamento(params).subscribe((result:any) => {
        console.log(result);
        if (result = "Departamento guardado")
        {
          console.log("Departamento guardado");
          this.obtenerDepartamentos();
        }

      });  
    }
    catch(error)
      {
        
      }   
  }

  openCreateDialog(modulo:string, departamento?: any): void {
    console.log(departamento);    
    
    const dialogRef = this.dialog.open(PopupCrearEditarComponent , {
      width:'350px',
      data: { 
              modulo:modulo,
              nombre: departamento ? departamento.nombre : '', 
              isEdit: !!departamento,
              listaFacultades: this.listadoFacultades
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (departamento) {
          console.log("Edita Departamento");
          this.editarDepartamento(departamento.id, result.nombre, result.entidadPerteneciente);
        } else {
          console.log("Crea departamento");
          this.crearDepartamento(result.nombre, result.entidadPerteneciente);
        }
      }
      
    });
  }
  openDeleteDialog(departamentoId: string, modulo:string):void{
    const dialogRef = this.dialog.open(PopupEliminarComponent , {
      width:'300px',
      data:{
        modulo: modulo,
        id: departamentoId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDepartamento(departamentoId);
      }
    });


  }

  obtenerFacultades() {
    this.facultadesService.getFacultades().subscribe(
      (facultades) => {
        this.listadoFacultades = facultades;

      },
      (error) => {
        console.error('Error al obtener las facultades:', error);
      }
    );
  }
}
