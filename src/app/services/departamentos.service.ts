import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private baseUrl = 'http://localhost:8080/departamento';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postDepartamento(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('nombre', params.nombre)
      .set('idFacultad', params.idFacultad);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editDepartamento(nombre: string, idDepartamento: string,  idFacultad:number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('nombre', nombre)
    .set('idDepartamento', idDepartamento)     
    .set('idFacultad', idFacultad);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteDepartamento(idDepartamento: string) {
    const url = `${this.baseUrl}/eliminar?id=${idDepartamento}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }
  
}
