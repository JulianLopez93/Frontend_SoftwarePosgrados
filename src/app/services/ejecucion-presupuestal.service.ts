import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EjecucionPresupuestalService {

  private baseUrl = 'http://localhost:8080/ejecucionPresupuestal';

  constructor(private http: HttpClient) { }

  getEjecucionPorPresupuesto(idPresupuesto:number) {
    const url = `${this.baseUrl}/buscarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  
}
