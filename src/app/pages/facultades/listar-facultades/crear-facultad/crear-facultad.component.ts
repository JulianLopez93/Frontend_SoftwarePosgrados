import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-facultad',
  templateUrl: './crear-facultad.component.html',
  styleUrls: ['./crear-facultad.component.css']
})
export class CrearFacultadComponent {
  constructor(
    public dialogRef: MatDialogRef<CrearFacultadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      console.log(data.nombre);
      console.log(data.isEdit);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
