import { Component } from '@angular/core';
import { FacultadesServicioService } from 'src/app/services/facultades-servicio.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrearFacultadComponent } from './crear-facultad/crear-facultad.component';
import { PopupEliminarFacultadComponent } from './popup-eliminar-facultad/popup-eliminar-facultad.component';

@Component({
  selector: 'app-listar-facultades',
  templateUrl: './listar-facultades.component.html',
  styleUrls: ['./listar-facultades.component.css']
})
export class ListarFacultadesComponent {
  facultades: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];
  form!: FormGroup;
  nombre:string='';
  p: number = 1;
  searchText: string = '';
  filteredFacultades: any[] = [];

  constructor(private facultadesService: FacultadesServicioService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.obtenerFacultades();
  }


  obtenerFacultades() {
    this.facultadesService.getFacultades().subscribe(
      (facultades) => {
        this.facultades = facultades;
        this.applyFilter();

      },
      (error) => {
        console.error('Error al obtener las facultades:', error);
      }
    );
  }

  applyFilter() {
    if (this.searchText) {
      this.filteredFacultades = this.facultades.filter(facultad =>
        facultad.nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredFacultades = this.facultades;
    }
  }

  editarFacultad(idFacultad:string, nombre:string)
  {
    try
    {
      console.log(nombre);
      const params =
      {
        nombre: nombre
      }
      console.log(params);
      this.facultadesService.editFacultad(idFacultad, nombre).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Facultad editada");
          this.obtenerFacultades();
        }

      });
    }
    catch(error)
      {

      }

  }
  eliminarFacultad(idFacultad:string)
  {
    try
    {
      console.log(idFacultad);
      this.facultadesService.deleteFacultad(idFacultad).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Facultad eliminada");
          this.obtenerFacultades();
        }

      });
    }
    catch(error)
      {

      }

  }
  crearFacultad(nombre:string)
  {
    try
    {
      console.log(nombre);
      const params =
      {
        nombre: nombre
      }
      console.log(params);
      this.facultadesService.postFacultad(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Facultad creada");
          this.obtenerFacultades();
        }

      });
    }
    catch(error)
      {

      }
  }

  openCreateDialog(facultad?: any): void {
    console.log(facultad);

    const dialogRef = this.dialog.open(CrearFacultadComponent , {
      width:'300px',
      data: { nombre: facultad ? facultad.nombre : '', isEdit: !!facultad }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (facultad) {
          console.log("Edita facultad");
          this.editarFacultad(facultad.id, result);
        } else {
          console.log("Crea facultad");
          this.crearFacultad(result);
        }
      }

    });
  }
  openDeleteDialog(facultadId: string):void{
    const dialogRef = this.dialog.open(PopupEliminarFacultadComponent , {
      width:'300px',
      data:{
        id: facultadId

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarFacultad(facultadId);
      }
    });

  }


}
