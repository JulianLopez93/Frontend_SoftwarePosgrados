import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AutenticacionService } from '@app/services/autenticacion.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../auth-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

 

  loginForm = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  });

  hide = true;

  constructor(private authService: AutenticacionService,
              private route:Router
  )
  {

  }

  ngOnInit() {
    localStorage.removeItem('authToken');
  }

  getErrorMessage() {
    if (this.loginForm?.get('username')?.hasError('required')) {
      return 'Debes ingresar tu nombre de usuario';
    }

    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: AuthResponse) => {
          console.log(response);
          //this.isLogged = true;
          const token = response.token;
          localStorage.setItem('authToken', token);
          //localStorage.setItem('sessionData', this.isLogged);
          console.log('Se loguea');
          this.route.navigate(['facultades/listar-facultades']);
        },
        error => {
          console.log("Error al iniciar sesión");
        }
      );
    }
  }

}
