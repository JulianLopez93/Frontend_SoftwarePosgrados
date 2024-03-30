import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgramasService {

  private baseUrl = 'http://localhost:8080/programa';

  constructor(private http: HttpClient) {}

  getProgramas(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get(url);
  }

  postPrograma(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('nombre', params.nombre)
      .set('idDepartamento', params.idDepartamento);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deletePrograma(idPrograma: string) {
    const url = `${this.baseUrl}/eliminar?id=${idPrograma}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editPrograma(nombre: string, idPrograma: string,  idDepartamento:number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('nombre', nombre)
    .set('idPrograma', idPrograma)     
    .set('idDepartamento', idDepartamento);
    return this.http.put(url, params, { responseType: 'text' });
  }
}
