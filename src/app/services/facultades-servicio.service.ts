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
    return this.http.get(url);
  }

  postFacultad(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('nombre', params.nombre);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteFacultad(idFacultad: string) {
    const url = `${this.baseUrl}/eliminar?id=${idFacultad}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editFacultad(idFacultad: string, nombre: string) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
      .set('id', idFacultad)
      .set('nombre', nombre);
    return this.http.put(url, params, { responseType: 'text' });
  }

  
}
