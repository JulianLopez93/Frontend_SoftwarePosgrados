import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  editDatosBasicosUsuario(id:string,nombre:string, apellido:string, email:string, idRol: number, idFacultad: number)
  {
    const url = `${this.baseUrl}/editarDatosBasicos`;
    const params = new HttpParams()
    .set('id', id)
    .set('nombre', nombre)
    .set('apellido', apellido)
    .set('email', email)
    .set('idRol', idRol)
    .set('idFacultad', idFacultad);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });

  }

  desactivarUsuario(username:string)
  {
    const url = `${this.baseUrl}/desactivar`;
    const params = new HttpParams()
    .set('username', username);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(url, params.toString(), { headers, responseType: 'text' });

  }

  activarUsuario(username:string)
  {
    const url = `${this.baseUrl}/activar`;
    const params = new HttpParams()
    .set('username', username);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(url, params.toString(), { headers, responseType: 'text' });

  }

  
}
