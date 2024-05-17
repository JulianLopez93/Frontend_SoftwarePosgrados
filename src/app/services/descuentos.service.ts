import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DescuentosService {
  private baseUrl = 'http://localhost:8080/egresoDescuento';

  constructor(private http: HttpClient) { }

  getDescuentos(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getDescuentosPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postDescuento(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('numEstudiantes', params.numEstudiantes)
      .set('valor', params.valor)
      .set('numPeriodos', params.numPeriodos)
      .set('idTipoDescuento', params.idTipoDescuento);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editDescuento(id: number, numEstudiantes: number, valor: number, numPeriodos: number, idTipoDescuento: number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
      .set('id', id.toString())
      .set('numEstudiantes', numEstudiantes)
      .set('valor', valor)
      .set('numPeriodos', numPeriodos)
      .set('idTipoDescuento', idTipoDescuento);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteDescuento(id: string) {
    const url = `${this.baseUrl}/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getTotalEgresosDescuentos(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/totalEgresosDescuentos?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
}
