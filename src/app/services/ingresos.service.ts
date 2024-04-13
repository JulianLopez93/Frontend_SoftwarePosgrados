import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {
  private baseUrl = 'http://localhost:8080/ingreso';

  constructor(private http: HttpClient) {}

  getIngresos(): Observable<any> {
    const url = `${this.baseUrl}/listar`;
    return this.http.get(url);
  }
  getIngresosPorPresupuesto(idPresupuesto:number): Observable<any> {
    const url = `${this.baseUrl}/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    return this.http.get(url);
  }

  postIngresos(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('concepto', params.concepto)
      .set('valor', params.valor);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  deleteIngreso(id: string) {
    const url = `${this.baseUrl}/eliminar?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  editIngreso(id: number, concepto: string, valor: number) {
    const url = `${this.baseUrl}/actualizar`;
    const params = new HttpParams()
    .set('id', id.toString())     
    .set('concepto', concepto)
    .set('valor', valor);
  return this.http.put(url, params.toString(), { params: params, responseType: 'text' });
  }
}
