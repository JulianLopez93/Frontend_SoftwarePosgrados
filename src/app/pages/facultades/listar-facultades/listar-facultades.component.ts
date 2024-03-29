import { Component } from '@angular/core';
import { FacultadesServicioService } from 'src/app/services/facultades-servicio.service';

@Component({
  selector: 'app-listar-facultades',
  templateUrl: './listar-facultades.component.html',
  styleUrls: ['./listar-facultades.component.css']
})
export class ListarFacultadesComponent {
  facultades: any[] = [];
  constructor(private facultadesService: FacultadesServicioService) {}

  ngOnInit() {
    this.obtenerFacultades();
  }

  obtenerFacultades() {
    this.facultadesService.getFacultades().subscribe(
      (facultades) => {
        this.facultades = facultades;// Asignamos los datos al arreglo de facultades

      },
      (error) => {
        console.error('Error al obtener las facultades:', error);
      }
    );
  }

}
