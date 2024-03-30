import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-eliminar-facultad',
  templateUrl: './popup-eliminar-facultad.component.html',
  styleUrls: ['./popup-eliminar-facultad.component.css']
})
export class PopupEliminarFacultadComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEliminarFacultadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
