import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthResponse } from '../pages/auth/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private baseUrl = 'http://localhost:8080/autenticacion';

  constructor(private http: HttpClient) { }

  login(params:any): Observable<AuthResponse>
  {
    console.log(params);
    const url = `${this.baseUrl}/login`;
    const body = new HttpParams()
      .set('username', params.username)
      .set('password', params.password);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  
    return this.http.post<AuthResponse>(url, body.toString(), { headers });
  }
}
