import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-crear-editar',
  templateUrl: './popup-crear-editar.component.html',
  styleUrls: ['./popup-crear-editar.component.css']
})
export class PopupCrearEditarComponent {
  listaPerteneciente:any [] = []
  entidadSeleccionada:number = 0;
  nombreIngresado:string = '';
  constructor(
    public dialogRef: MatDialogRef<PopupCrearEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      console.log(data.modulo);
      console.log(data.numero);
      console.log(data.fecha);
      console.log(data.nombre);
      console.log(data.isEdit);
      console.log(data.listaDepartamentos);
      console.log(data.listaFacultades);
      console.log(data.listaProgramas);
      switch (data.modulo) {
        case 'departamento':
          this.listaPerteneciente = data.listaFacultades;
          break;
        case 'programa':
          this.listaPerteneciente = data.listaDepartamentos;
          break;
        case 'cohorte':
          this.listaPerteneciente = data.listaProgramas;
          break;
        default:
          this.listaPerteneciente = [];
          break;
      }
      console.log(this.listaPerteneciente);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onAccept():void
    {
      const nombre = this.data.nombre;
      const entidadPerteneciente = this.entidadSeleccionada;
      const numero = this.data.numero;
      
      // Verifica si la fecha está definida antes de intentar formatearla
      const fecha = this.data.fecha ? this.formatDate(new Date(this.data.fecha)) : undefined;
      
      console.log(nombre);
      console.log(entidadPerteneciente);
      console.log(fecha);
      
      this.dialogRef.close({
        nombre: nombre,
        entidadPerteneciente: entidadPerteneciente,
        numero: numero,
        fecha: fecha
      });
    }

    formatDate(date: Date): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;  // Los meses en JavaScript empiezan en 0
      const year = date.getFullYear();

      return `${this.pad(day)}-${this.pad(month)}-${year}`;
    }

    pad(number: number): string {
      if (number < 10) {
        return '0' + number;
      } else {
        return number.toString();
      }
    }

}
