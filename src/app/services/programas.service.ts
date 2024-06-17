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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postPrograma(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('nombre', params.nombre)
      .set('idFacultad', params.idFacultad)
      .set('priorizado', params.esPriorizado);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  getProgramasPorFacultad(idFacultad:number) {
    const url = `${this.baseUrl}/listarPorFacultad?idFacultad=${idFacultad}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  editPrograma(nombre: string, idPrograma: string,  idFacultad:number, esPriorizado: boolean) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('nombre', nombre)
    .set('idPrograma', idPrograma)     
    .set('idFacultad', idFacultad)
    .set('priorizado', esPriorizado);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deletePrograma(idPrograma: string) {
    const url = `${this.baseUrl}/eliminar?id=${idPrograma}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  
}
