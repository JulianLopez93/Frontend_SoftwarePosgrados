import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-eliminar',
  templateUrl: './popup-eliminar.component.html',
  styleUrls: ['./popup-eliminar.component.css']
})
export class PopupEliminarComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
