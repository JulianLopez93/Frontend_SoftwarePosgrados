import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  private baseUrl = 'http://localhost:8080/presupuesto';

  constructor(private http: HttpClient) {}

  getPresupuestos(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get(url);
  }

  postPresupuesto(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('idCohorte', params.idCohorte);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  sendPresupuestoForReview(id:number)
  {
    const url = `${this.baseUrl}/enviarParaRevision?id=${id}`;
    return this.http.put(url, id.toString());

  }

  getPresupuestoPorCohorte(idCohorte:number)
  {
    const url = `${this.baseUrl}/buscarPorCohorte?idCohorte=${idCohorte}`;
    return this.http.get(url);
  }

  deletePresupuesto(idCohorte: string) {
    const url = `${this.baseUrl}/eliminar?id=${idCohorte}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editPresupuesto(id:number, observaciones:string) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('id', id)
    .set('observaciones', observaciones)
  return this.http.put(url, params.toString(), { params: params, responseType: 'text' });
  }
}
