import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CdpService {

  private baseUrl = 'http://localhost:8080/cdp';

  constructor(private http: HttpClient) { }

  getRubros(): Observable<any> {
    const url = `${this.baseUrl}/listarRubros`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getEgresosRubroDisponible(rubro:string): Observable<any> {
    const url = `${this.baseUrl}/listarPorRubroDisponibles?rubro=${rubro}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
}
