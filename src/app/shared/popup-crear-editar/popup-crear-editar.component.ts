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
      console.log(nombre);
      console.log(entidadPerteneciente);
      this.dialogRef.close({
        nombre: nombre,
        entidadPerteneciente: entidadPerteneciente
      });
    }

}
