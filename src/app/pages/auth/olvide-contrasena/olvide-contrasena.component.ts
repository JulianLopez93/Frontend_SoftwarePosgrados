import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AutenticacionService } from '@app/services/autenticacion.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../auth-response';

@Component({
  selector: 'app-olvide-contrasena',
  templateUrl: './olvide-contrasena.component.html',
  styleUrls: ['./olvide-contrasena.component.css']
})
export class OlvideContrasenaComponent {
  passwordForgetForm = new FormGroup({
    'email': new FormControl(null, Validators.required)
  });

  hide = true;

  successfulSend = false;

  constructor(private authService: AutenticacionService,
              private route:Router
  )
  {

  }

  onSubmit() {
    try 
    {
      if (this.passwordForgetForm && this.passwordForgetForm.valid) {
        const email = this.passwordForgetForm.get('email')?.value;
        if (email) { // Verifica que email no sea null ni undefined
          this.authService.olvideContrasena(email).subscribe(
            (response: any) => {
              console.log(response);
              if (response !== null) {
                console.log('Envia email recuperacion contrasena');
                this.successfulSend = true;
                this.route.navigate(['/login/cambiar-contrasena']);
              }
            },
          );
        }
      }
    } 
    catch (error) 
    {
      console.error("Error al obtener email");
    }
    
  }

}
