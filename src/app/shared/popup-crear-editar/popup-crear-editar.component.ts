import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-popup-crear-editar',
  templateUrl: './popup-crear-editar.component.html',
  styleUrls: ['./popup-crear-editar.component.css']
})
export class PopupCrearEditarComponent {
  listaPerteneciente:any [] = []
  listaProgramasUsuario:any [] = []
  listaRoles:any [] = [];
  entidadSeleccionada:number = 0;
  rolSeleccionado:number = 1;
  programaSeleccionado:number = 0;
  nombreIngresado:string = '';
  showError: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PopupCrearEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef) {
      console.log(data);
      console.log(data.modulo);
      console.log(data.numero);
      console.log(data.fecha);
      console.log(data.nombre);
      console.log(data.apellido);
      console.log(data.email);
      console.log(data.isEdit);
      console.log(data.listaDepartamentos);
      console.log(data.listaFacultades);
      console.log(data.listaProgramas);
      console.log(data.listaProgramasUsuario);
      console.log(data.listaRoles);
      console.log(data.isPriorizado);

      this.listaRoles = data.listaRoles;
      this.listaProgramasUsuario = data.listaProgramas;

      switch (data.modulo) {
        case 'departamento':
          this.listaPerteneciente = data.listaFacultades;
          break;
        case 'programa':
          this.listaPerteneciente = data.listaFacultades;
          break;
        case 'usuario':
        this.listaPerteneciente = data.listaFacultades;
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
      console.log(this.rolSeleccionado);
    }
    cambiaRoles()
    {
      console.log(this.rolSeleccionado);
      //this.cdr.detectChanges();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onAccept():void {
      this.showError = false;

      const entidadPerteneciente = this.entidadSeleccionada;
      const rolperteneciente = this.rolSeleccionado;
      let nombre;
      let apellido;
      let email;
      let password;
      let numero;
      let fecha;
      let concepto;
      let valor;
      let numEstudiantes;
      let numPeriodos
      let result;
      let esPriorizado;

      valor = this.data.valor;
      concepto = this.data.concepto;
      numEstudiantes = this.data.numEstudiantes;
      numPeriodos = this.data.numPeriodos;

      console.log(nombre);
      console.log(entidadPerteneciente);
      console.log(rolperteneciente);
      console.log(fecha);
      console.log(valor);
      console.log(numEstudiantes);
      console.log(numPeriodos);
      console.log(concepto);

      // Verifica si los campos están vacíos
      if (this.data.modulo === 'cohorte') {
        console.log("Entra if de cohorte");
        if (!this.data.numero || !this.data.fecha || this.entidadSeleccionada === 0) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        numero = this.data.numero;
        fecha = this.data.fecha ? this.formatDate(new Date(this.data.fecha)) : undefined;

        result = {
          entidadPerteneciente: entidadPerteneciente,
          numero: numero,
          fecha: fecha
        };
      }
      else if (this.data.modulo === 'programa') {
        nombre = this.data.nombre;
        esPriorizado = this.data.isPriorizado;
        console.log(nombre);
        console.log(esPriorizado);

        if (!nombre || !esPriorizado || this.entidadSeleccionada === 0) 
        {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }

        result = {
          nombre: nombre,
          esPriorizado: esPriorizado,
          entidadPerteneciente: entidadPerteneciente
        };
      }


      // Construye el objeto que se devuelve dependiendo del módulo
      
      else if (this.data.modulo === 'ingreso') {
        
        if (!this.data.concepto || !this.data.valor || isNaN(this.data.valor)) {
          console.log('Entra validacion ingreso');
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          concepto: concepto,
          valor: valor
        };
      }
      else if (this.data.modulo === 'descuento') {
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
      else if (this.data.modulo === 'usuario')
        {
          nombre = this.data.nombre;
          apellido = this.data.apellido;
          email = this.data.email;
          console.log(nombre);
          console.log(apellido);
          console.log(email);
          console.log(rolperteneciente);

          if (!nombre || !apellido || !email || rolperteneciente === 0
            || this.entidadSeleccionada === 0
          ) 
          {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
          }

          result = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            rol: rolperteneciente,
            entidadPerteneciente: entidadPerteneciente
          };
        }
      else {
        if(this.data.modulo !== 'tipo de compensacion' && this.data.modulo !== 'tipo de costo' && this.data.modulo !== 'tipo de transferencia'
        && this.data.modulo !== 'tipo de descuento' && this.data.modulo !== 'tipo de inversion' && this.data.modulo !== 'ingreso'
        && this.data.modulo !== 'descuento' && this.data.modulo !== 'cohorte')
          {
            if (!this.data.nombre || this.entidadSeleccionada === 0) {
              this.showError = true; // Muestra el mensaje de error
              return; // Detiene la ejecución si hay campos vacíos
            }

          }
        
        nombre = this.data.nombre;

        result = {
          nombre: nombre,
          entidadPerteneciente: entidadPerteneciente
        };
      }

      this.dialogRef.close(result);
    }

    onAcceptCDP():void {
      this.showError = false;

      const entidadPerteneciente = this.data?.tipoPerteneciente?.id;
      let valor;
      let numEstudiantes;
      let numPeriodos

      let result;

      valor = this.data.valor;
      numEstudiantes = this.data.numEstudiantes;
      numPeriodos = this.data.numPeriodos;

      if (!this.data.numEstudiantes || !this.data.numPeriodos || !this.data.valor 
        || isNaN(this.data.valor) || isNaN(this.data.numEstudiantes) || isNaN(this.data.numPeriodos 
          || entidadPerteneciente=== 0)) {
        this.showError = true; // Muestra el mensaje de error
        return; // Detiene la ejecución si hay campos vacíos
      }
      result = {
        entidadPerteneciente: entidadPerteneciente,
        numEstudiantes: numEstudiantes,
        numPeriodos: numPeriodos,
        valor: valor,
        descripcionCDP: this.data.descripcionCDP,
        CPC: this.data.CPC
      };

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
