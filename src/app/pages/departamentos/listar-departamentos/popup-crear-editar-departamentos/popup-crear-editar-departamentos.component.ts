import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-crear-editar-departamentos',
  templateUrl: './popup-crear-editar-departamentos.component.html',
  styleUrls: ['./popup-crear-editar-departamentos.component.css']
})
export class PopupCrearEditarDepartamentosComponent {
  listaFacultades:any [] = [];
  facultadSeleccionada:number = 0;
  nombreIngresado:string = '';
  constructor(
    public dialogRef: MatDialogRef<PopupCrearEditarDepartamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      console.log(data.nombre);
      console.log(data.isEdit);
      console.log(data.listaFacultades);
      this.listaFacultades = data.listaFacultades;
      console.log(this.listaFacultades);
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    onAccept():void
    {
      const nombre = this.data.nombre;
      const facultad = this.facultadSeleccionada;
      console.log(nombre);
      console.log(facultad);
      this.dialogRef.close({
        nombre: nombre,
        facultad: facultad
      });
    }

}
