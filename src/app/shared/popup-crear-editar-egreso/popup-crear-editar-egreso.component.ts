import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-crear-editar-egreso',
  templateUrl: './popup-crear-editar-egreso.component.html',
  styleUrls: ['./popup-crear-editar-egreso.component.css']
})
export class PopupCrearEditarEgresoComponent {

  listaPerteneciente:any [] = []
  entidadSeleccionada:number = 0;
  nombreIngresado:string = '';
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PopupCrearEditarEgresoComponent>,
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
      
      this.listaPerteneciente = data.listaTipoPerteneciente;
      console.log(this.listaPerteneciente);

      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onAccept():void {
      this.showError = false;

      let descripcion;
      let porcentaje;
      let concepto;
      let valorUnitario;
      let cantidad;
      let servicio;

      const entidadPerteneciente = this.entidadSeleccionada;
      descripcion = this.data.descripcion;
      porcentaje = this.data.porcentaje;
      concepto = this.data.concepto;
      valorUnitario = this.data.valorUnitario;
      cantidad = this.data.cantidad;
      servicio = this.data.servicio;

      console.log(entidadPerteneciente);
      console.log(descripcion);
      console.log(porcentaje);
      console.log(concepto);
      console.log(valorUnitario);
      console.log(cantidad);
      console.log(servicio);

      // Construye el objeto que se devuelve dependiendo del módulo
      let result;
      if (this.data.modulo === 'egreso transferencia') {
        if (!this.data.descripcion || !this.data.porcentaje || this.entidadSeleccionada === 0
          || isNaN(this.data.porcentaje)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          descripcion: descripcion,
          porcentaje: porcentaje
        };
      } 
      else {
      }
      if (this.data.modulo === 'egreso general' || this.data.modulo === 'otro egreso') {
        if (!this.data.concepto || !this.data.valorUnitario || this.entidadSeleccionada === 0
          || isNaN(this.data.valorUnitario) || isNaN(this.data.cantidad)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          concepto: concepto,
          valorUnitario: valorUnitario,
          cantidad: cantidad
        };
      } 
      if (this.data.modulo === 'egreso servicio no docente') {
        if (!this.data.servicio|| !this.data.valorUnitario || this.entidadSeleccionada === 0
          || isNaN(this.data.valorUnitario) || isNaN(this.data.cantidad)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          servicio: servicio,
          valorUnitario: valorUnitario,
          cantidad: cantidad
        };
      } 
      else {
      }

      this.dialogRef.close(result);
    }
}
