import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TiposService {private baseUrl = 'http://localhost:8080';

constructor(private http: HttpClient) {}

  getTiposCompensacion(): Observable<any> {
    const url = `${this.baseUrl}/tipoCompensacion/listar`;
    return this.http.get(url);
  }

  postTiposCompensacion(params: any) {
    const url = `${this.baseUrl}/tipoCompensacion/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteTipoCompensacion(id: string) {
    const url = `${this.baseUrl}/tipoCompensacion/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editTipoCompensacion(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoCompensacion/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getTiposCosto(): Observable<any> {
    const url = `${this.baseUrl}/tipoCosto/listar`;
    return this.http.get(url);
  }

  postTipoCosto(params: any) {
    const url = `${this.baseUrl}/tipoCosto/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteTipoCosto(id: string) {
    const url = `${this.baseUrl}/tipoCosto/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editTipoCosto(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoCosto/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getTiposTransferencia(): Observable<any> {
    const url = `${this.baseUrl}/tipoTransferencia/listar`;
    return this.http.get(url);
  }

  postTipoTransferencia(params: any) {
    const url = `${this.baseUrl}/tipoTransferencia/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteTipoTransferencia(id: string) {
    const url = `${this.baseUrl}/tipoTransferencia/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editTipoTransferencia(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoTransferencia/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getTiposDescuento(): Observable<any> {
    const url = `${this.baseUrl}/tipoDescuento/listar`;
    return this.http.get(url);
  }

  postTipoDescuento(params: any) {
    const url = `${this.baseUrl}/tipoDescuento/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteTipoDescuento(id: string) {
    const url = `${this.baseUrl}/tipoDescuento/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editTipoDescuento(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoDescuento/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    return this.http.put(url, params, { responseType: 'text' });
  }
  getTiposInversion(): Observable<any> {
    const url = `${this.baseUrl}/tipoInversion/listar`;
    return this.http.get(url);
  }

  postTipoInversion(params: any) {
    const url = `${this.baseUrl}/tipoInversion/crear`;
    const body = new HttpParams()
      .set('nombreTipo', params.nombreTipo);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteTipoInversion(id: string) {
    const url = `${this.baseUrl}/tipoInversion/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editTipoInversion(id: string, nombreTipo: string) {
    const url = `${this.baseUrl}/tipoInversion/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreTipo', nombreTipo);
    return this.http.put(url, params, { responseType: 'text' });
  }
}
