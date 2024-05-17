import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacultadesServicioService {
  private baseUrl = 'http://localhost:8080/facultad';

  constructor(private http: HttpClient) {}

  getFacultades(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postFacultad(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('nombre', params.nombre);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }
  
  editFacultad(idFacultad: string, nombre: string) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
      .set('id', idFacultad)
      .set('nombre', nombre);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteFacultad(idFacultad: string) {
    const url = `${this.baseUrl}/eliminar?id=${idFacultad}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  

  
}
