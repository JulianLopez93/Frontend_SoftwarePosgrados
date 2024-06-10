import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthResponse } from '../pages/auth/auth-response';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private baseUrl = 'http://localhost:8080/autenticacion';

  constructor(private http: HttpClient) { }

  login(params:any): Observable<AuthResponse>
  {
    console.log(params);
    const url = `${this.baseUrl}/login`;
    const body = new HttpParams()
      .set('username', params.username)
      .set('password', params.password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post<AuthResponse>(url, body.toString(), { headers });
  }

  registrarUsuario(params:any):Observable<AuthResponse>
  {
    console.log(params);
    const url = `${this.baseUrl}/registro`;
    const body = new HttpParams()
      .set('nombre', params.nombre)
      .set('apellido', params.apellido)
      .set('email', params.email)
      .set('idRol', params.idRol)
      .set('idFacultad', params.idFacultad)
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post<AuthResponse>(url, body.toString(), { headers });

  }

  olvideContrasena(email: string) {
    const url = `${this.baseUrl}/olvideMiPassword`;
    const body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  cambiarContrasena(params:any) {
    console.log(params);
    const url = `${this.baseUrl}/cambiarPassword`;
    const body = new HttpParams()
      .set('token', params.token)
      .set('password', params.password);
    console.log(body);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Bearer ' + params.token
     });
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
}
}
