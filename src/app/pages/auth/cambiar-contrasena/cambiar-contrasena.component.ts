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

  recoveryToken: any

  passwordChangeForm = new FormGroup({
    'newPassword': new FormControl(null, Validators.required)
  });

  hide = true;

  successfulSend = false;

  constructor(private authService: AutenticacionService,
    private route: Router,
    private route2: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route2.queryParams.subscribe(params => {
      this.recoveryToken = params['token'];
      //console.log("token " + this.recoveryToken);
    });
  }


  onSubmit() {
    try {
      if (this.passwordChangeForm && this.passwordChangeForm.valid) {
        const newPassword = this.passwordChangeForm.get('newPassword')?.value;
        let token;

        // Si recoveryToken existe, significa que el usuario está utilizando el enlace de recuperación
        if (this.recoveryToken) {
          token = this.recoveryToken;
        } else {
          // Si no, entonces el usuario está logueado y cambia la contraseña desde su sesión
          token = localStorage.getItem('authToken');
        }

        console.log(token);
        console.log(newPassword);

        if (newPassword && token) { // Verifica que password y token no sean null ni undefined
          const params = {
            'token': token,
            'password': newPassword
          }
          console.log(params);
          this.authService.cambiarContrasena(params).subscribe(
            (response: any) => {
              if (response !== null) {
                console.log(response);
                console.log('Cambio de contraseña exitoso');
                this.successfulSend = true;
                // Redirige al usuario a una ruta adecuada después del cambio de contraseña
                this.route.navigate(['ruta/deseada/despues/cambio/contraseña']);
              }
            }
          );
        }
      }
    } catch (error) {
      console.error("Error al cambiar contraseña");
    }
  }


}
