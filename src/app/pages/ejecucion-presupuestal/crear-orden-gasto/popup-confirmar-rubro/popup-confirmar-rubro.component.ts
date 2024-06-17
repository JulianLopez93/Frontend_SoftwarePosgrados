import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-confirmar-rubro',
  templateUrl: './popup-confirmar-rubro.component.html',
  styleUrls: ['./popup-confirmar-rubro.component.css']
})
export class PopupConfirmarRubroComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupConfirmarRubroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route:Router) {}

    

    onNoClick(): void {
      this.dialogRef.close();
    }
    onAccept(){
      let result;
      result = 
      {
        confirmacion: 'si'
      }
      this.dialogRef.close(result);

    }
}
