import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacultadesServicioService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getFacultades(): Observable<any> {
    const url = `${this.baseUrl}/facultad/listar`;
    return this.http.get(url);
  }

  
}
