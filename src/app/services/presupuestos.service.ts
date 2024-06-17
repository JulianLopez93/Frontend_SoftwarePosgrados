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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postPresupuesto(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('idCohorte', params.idCohorte);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  sendPresupuestoForReview(id:number) {
    const url = `${this.baseUrl}/enviarParaRevision?id=${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, id.toString(), { headers });
  }

  getPresupuestoPorCohorte(idCohorte:number) {
    const url = `${this.baseUrl}/buscarPorCohorte?idCohorte=${idCohorte}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getPresupuestosPorRevisarPorFacultad(): Observable<any>  {
    const url = `${this.baseUrl}/listarPorFacultadPorRevisar`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getPresupuestosAprobadosPorFacultad(): Observable<any> {
    const url = `${this.baseUrl}/listarPorFacultadAprobados`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getPresupuestosDesaprobadosPorFacultad(): Observable<any>  {
    const url = `${this.baseUrl}/listarPorFacultadDesaprobados`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  deletePresupuesto(idCohorte: string) {
    const url = `${this.baseUrl}/eliminar?id=${idCohorte}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editPresupuesto(id:number, observaciones:string, idCohorte:number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('id', id)
    .set('observaciones', observaciones)
    .set('idCohorte', idCohorte);
  return this.http.put(url, params.toString(), { params: params, responseType: 'text' });
  }
  disapprovePresupuesto(id:string) {
    console.log(id);
    const url = `${this.baseUrl}/desaprobar`;
    console.log(url);
    const params = new HttpParams()
    .set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
  return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }
  approvePresupuesto(id:number) {
    const url = `${this.baseUrl}/aprobar`;
    const params = new HttpParams()
    .set('id', id);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
  return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }
}
