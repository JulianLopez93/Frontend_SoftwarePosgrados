import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private baseUrl = 'http://localhost:8080/ingreso';

  constructor(private http: HttpClient) { }

  getIngresos(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getIngresosPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postIngresos(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('concepto', params.concepto)
      .set('valor', params.valor);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editIngreso(id: number, concepto: string, valor: number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
      .set('id', id.toString())
      .set('concepto', concepto)
      .set('valor', valor);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteIngreso(id: string) {
    const url = `${this.baseUrl}/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getTotalIngresos(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/totalIngresos?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
}
