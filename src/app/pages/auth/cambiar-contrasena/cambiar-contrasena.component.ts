import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AutenticacionService } from '@app/services/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthResponse } from '../auth-response';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent {

  recoveryToken:any

  passwordChangeForm = new FormGroup({
    'newPassword': new FormControl(null, Validators.required)
  });

  hide = true;

  successfulSend = false;

  constructor(private authService: AutenticacionService,
    private route:Router,
    private route2:ActivatedRoute
  )
  {

  }
  ngOnInit()
  {
    this.recoveryToken = this.route2.snapshot.queryParamMap.get('token');
    console.log(this.recoveryToken);
  }

  onSubmit() {
    try 
    {
      if (this.passwordChangeForm && this.passwordChangeForm.valid) {
        const token = localStorage.getItem('authToken');
        const newPassword = this.passwordChangeForm.get('newPassword')?.value;
        console.log(token);
        console.log(newPassword);
        const params = 
        {
          'token': token,
          'password': newPassword
        }
        console.log(params);
        if (newPassword && token) { // Verifica que password y token no sea null ni undefined
          this.authService.cambiarContrasena(params).subscribe(
            (response: any) => {
              if (response !== null)
                {
                  console.log(response);
                  console.log('Cambio de contraseña exitoso');
                  this.successfulSend = true;
                  this.route.navigate(['facultades/listar-facultades']);
  
                }
              
            }
          );
        }
      }
      
    } 
    catch (error) 
    {
      console.error("Error al cambiar contraseña");
    }
    
  }

}
