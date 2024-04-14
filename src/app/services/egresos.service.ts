import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgresosService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getEgresosTransferencia(): Observable<any> {
    const url = `${this.baseUrl}/egresoTransferencia/listar`;
    return this.http.get(url);
  }

  getEgresosTransferenciaPorPresupuesto(idPresupuesto:number): Observable<any> {
    const url = `${this.baseUrl}/egresoTransferencia/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    return this.http.get(url);
  }

  postEgresoTransferencia(params: any) {
    const url = `${this.baseUrl}/egresoTransferencia/crear`;
    const body = new HttpParams()
    .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
    .set('descripcion', params.descripcion)
    .set('porcentaje', params.porcentaje)
    .set('idTipoTransferencia', params.idTipoTransferencia);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoTransferencia(id: string) {
    const url = `${this.baseUrl}/egresoTransferencia/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editEgresoTransferencia(id:number, descripcion: string, porcentaje:number, idTipoTransferencia:number) {
    const url = `${this.baseUrl}/egresoTransferencia/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('descripcion', descripcion)
    .set('porcentaje', porcentaje)
    .set('idTipoTransferencia', idTipoTransferencia);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getEgresosGenerales(): Observable<any> {
    const url = `${this.baseUrl}/egresoGeneral/listar`;
    return this.http.get(url);
  }

  getEgresosGeneralesPorPresupuesto(idPresupuesto:number): Observable<any> {
    const url = `${this.baseUrl}/egresoGeneral/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    return this.http.get(url);
  }

  postEgresoGeneral(params: any) {
    const url = `${this.baseUrl}/egresoGeneral/crear`;
    const body = new HttpParams()
    .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
    .set('concepto', params.concepto)
    .set('valorUnitario', params.valorUnitario)
    .set('cantidad', params.cantidad)
    .set('idTipoCosto', params.idTipoCosto);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoGeneral(id: string) {
    const url = `${this.baseUrl}/egresoGeneral/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editEgresoGeneral(id:number, concepto: string, valorUnitario:number, cantidad:number, idTipoCosto:number) {
    const url = `${this.baseUrl}/egresoGeneral/actualizar`;
    const params = new HttpParams()
    .set('id', id)
    .set('concepto', concepto)
    .set('valorUnitario', valorUnitario)
    .set('cantidad', cantidad)
    .set('idTipoCosto', idTipoCosto);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getEgresosOtros(): Observable<any> {
    const url = `${this.baseUrl}/egresoOtro/listar`;
    return this.http.get(url);
  }

  getEgresosOtrosPorPresupuesto(idPresupuesto:number): Observable<any> {
    const url = `${this.baseUrl}/egresoOtro/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    return this.http.get(url);
  }

  postEgresoOtros(params: any) {
    const url = `${this.baseUrl}/egresoOtro/crear`;
    const body = new HttpParams()
    .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
    .set('concepto', params.concepto)
    .set('valorUnitario', params.valorUnitario)
    .set('cantidad', params.cantidad)
    .set('idTipoCosto', params.idTipoCosto);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoOtros(id: string) {
    const url = `${this.baseUrl}/egresoOtro/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editEgresoOtros(id:number, concepto: string, valorUnitario:number, cantidad:number, idTipoCosto:number) {
    const url = `${this.baseUrl}/egresoOtro/actualizar`;
    const params = new HttpParams()
    .set('id', id)
    .set('concepto', concepto)
    .set('valorUnitario', valorUnitario)
    .set('cantidad', cantidad)
    .set('idTipoCosto', idTipoCosto);
    return this.http.put(url, params, { responseType: 'text' });
  }

  getEgresosServiciosNoDocente(): Observable<any> {
    const url = `${this.baseUrl}/egresoServNoDocente/listar`;
    return this.http.get(url);
  }

  getEgresosServiciosNoDocentePorPresupuesto(idPresupuesto:number): Observable<any> {
    const url = `${this.baseUrl}/egresoServNoDocente/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    return this.http.get(url);
  }

  postEgresoServiciosNoDocente(params: any) {
    const url = `${this.baseUrl}/egresoServNoDocente/crear`;
    const body = new HttpParams()
    .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
    .set('servicio', params.servicio)
    .set('valorUnitario', params.valorUnitario)
    .set('cantidad', params.cantidad)
    .set('idTipoCosto', params.idTipoCosto);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoServiciosNoDocente(id: string) {
    const url = `${this.baseUrl}/egresoServNoDocente/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editEgresoServiciosNoDocente(id:number, servicio: string, valorUnitario:number, cantidad:number, idTipoCosto:number) {
    const url = `${this.baseUrl}/egresoServNoDocente/actualizar`;
    const params = new HttpParams()
    .set('id', id)
    .set('servicio', servicio)
    .set('valorUnitario', valorUnitario)
    .set('cantidad', cantidad)
    .set('idTipoCosto', idTipoCosto);
    return this.http.put(url, params, { responseType: 'text' });
  }
}
