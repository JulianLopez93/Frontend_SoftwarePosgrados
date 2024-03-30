import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-eliminar-departamentos',
  templateUrl: './popup-eliminar-departamentos.component.html',
  styleUrls: ['./popup-eliminar-departamentos.component.css']
})
export class PopupEliminarDepartamentosComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEliminarDepartamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
