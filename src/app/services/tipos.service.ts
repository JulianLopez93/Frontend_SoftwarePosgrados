import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  
private baseUrl = 'http://localhost:8080';

constructor(private http: HttpClient) {}

  getTiposCompensacion(): Observable<any> {
    const url = `${this.baseUrl}/tipoCompensacion/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postTiposCompensacion(params: any) {
    const url = `${this.baseUrl}/tipoCompensacion/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editTipoCompensacion(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoCompensacion/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteTipoCompensacion(id: string) {
    const url = `${this.baseUrl}/tipoCompensacion/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getTiposCosto(): Observable<any> {
    const url = `${this.baseUrl}/tipoCosto/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  
  postTipoCosto(params: any) {
    const url = `${this.baseUrl}/tipoCosto/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editTipoCosto(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoCosto/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }
  
  deleteTipoCosto(id: string) {
    const url = `${this.baseUrl}/tipoCosto/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }
  
 

  getTiposTransferencia(): Observable<any> {
    const url = `${this.baseUrl}/tipoTransferencia/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postTipoTransferencia(params: any) {
    const url = `${this.baseUrl}/tipoTransferencia/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editTipoTransferencia(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoTransferencia/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteTipoTransferencia(id: string) {
    const url = `${this.baseUrl}/tipoTransferencia/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getTiposDescuento(): Observable<any> {
    const url = `${this.baseUrl}/tipoDescuento/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postTipoDescuento(params: any) {
    const url = `${this.baseUrl}/tipoDescuento/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editTipoDescuento(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoDescuento/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteTipoDescuento(id: string) {
    const url = `${this.baseUrl}/tipoDescuento/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  
  getTiposInversion(): Observable<any> {
    const url = `${this.baseUrl}/tipoInversion/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postTipoInversion(params: any) {
    const url = `${this.baseUrl}/tipoInversion/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editTipoInversion(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoInversion/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteTipoInversion(id: string) {
    const url = `${this.baseUrl}/tipoInversion/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  
}
