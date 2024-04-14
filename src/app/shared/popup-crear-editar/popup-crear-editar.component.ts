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
  showError: boolean = false;


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
        case 'descuento':
          this.listaPerteneciente = data.listaTiposDescuento;
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
    onAccept():void {
      this.showError = false;

      let nombre;
      let numero;
      let fecha;
      let concepto;
      let valor;
      let numEstudiantes;
      let numPeriodos

      // Verifica si los campos están vacíos
      if (this.data.modulo === 'cohorte') {
        if (!this.data.numero || !this.data.fecha || this.entidadSeleccionada === 0) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        numero = this.data.numero;
        fecha = this.data.fecha ? this.formatDate(new Date(this.data.fecha)) : undefined;
      } else {
        if(this.data.modulo !== 'tipo de compensacion' && this.data.modulo !== 'tipo de costo' && this.data.modulo !== 'tipo de transferencia'
        && this.data.modulo !== 'tipo de descuento' && this.data.modulo !== 'tipo de inversion' && this.data.modulo !== 'ingreso'
        && this.data.modulo !== 'descuento')
          {
            if (!this.data.nombre || this.entidadSeleccionada === 0) {
              this.showError = true; // Muestra el mensaje de error
              return; // Detiene la ejecución si hay campos vacíos
            }

          }
        
        nombre = this.data.nombre;
      }

      const entidadPerteneciente = this.entidadSeleccionada;
      valor = this.data.valor;
      concepto = this.data.concepto;
      numEstudiantes = this.data.numEstudiantes;
      numPeriodos = this.data.numPeriodos;

      console.log(nombre);
      console.log(entidadPerteneciente);
      console.log(fecha);
      console.log(valor);
      console.log(numEstudiantes);
      console.log(numPeriodos);

      // Construye el objeto que se devuelve dependiendo del módulo
      let result;
      if (this.data.modulo === 'cohorte') {
        result = {
          entidadPerteneciente: entidadPerteneciente,
          numero: numero,
          fecha: fecha
        };
      }
      if (this.data.modulo === 'ingreso') {
        if (!this.data.concepto || !this.data.valor || isNaN(this.data.valor)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          concepto: concepto,
          valor: valor
        };
      }
      if (this.data.modulo === 'descuento') {
        if (!this.data.numEstudiantes || !this.data.numPeriodos || !this.data.valor 
          || isNaN(this.data.valor) || isNaN(this.data.numEstudiantes) || isNaN(this.data.numPeriodos 
            || this.entidadSeleccionada === 0)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          numEstudiantes: numEstudiantes,
          numPeriodos: numPeriodos,
          valor: valor
        };
      } 
      else {
        result = {
          nombre: nombre,
          entidadPerteneciente: entidadPerteneciente
        };
      }

      this.dialogRef.close(result);
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
