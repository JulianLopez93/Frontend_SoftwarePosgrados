import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CohortesService {

  private baseUrl = 'http://localhost:8080/cohorte';

  constructor(private http: HttpClient) {}

  getCohortes(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get(url);
  }

  searchCohorte(idCohorte: string)
  {
    const url = `${this.baseUrl}/buscar?id=${idCohorte}`;
    return this.http.get(url, { responseType: 'text' });

  }

  postCohortes(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('numero', params.numero)
      .set('fecha', params.fecha)
      .set('idPrograma', params.idPrograma);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteCohorte(idCohorte: string) {
    const url = `${this.baseUrl}/eliminar?id=${idCohorte}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editCohorte(numero: string, fecha: string, idCohorte: string,  idPrograma:number) {
    const url = `${this.baseUrl}/actualizar`;
    const fechaFormateada = new Date(fecha).toISOString().split('T')[0];
    const params = new HttpParams()
    .set('numero', numero)
    .set('fecha', fechaFormateada)
    .set('idCohorte', idCohorte.toString())     
    .set('idPrograma', idPrograma.toString());
  return this.http.put(url, params.toString(), { params: params, responseType: 'text' });
  }
}
