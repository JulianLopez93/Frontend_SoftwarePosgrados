import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-confirmar-creacion',
  templateUrl: './popup-confirmar-creacion.component.html',
  styleUrls: ['./popup-confirmar-creacion.component.css']
})
export class PopupConfirmarCreacionComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupConfirmarCreacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route:Router) {}

    

    onNoClick(): void {
      this.dialogRef.close();
    }
    onAccept(){
      this.route.navigate(['presupuestos/crear-presupuesto', this.data.idCohorte.toString()]);
      this.dialogRef.close();

    }

}
