import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CdpService {

  private baseUrl = 'http://localhost:8080/cdp';

  constructor(private http: HttpClient) { }

  postCDP(params: any) {
    const url = `${this.baseUrl}/crear`;
    const body = new HttpParams()
      .set('rubro', params.rubro)
      .set('idEjecucionPresupuestal', params.idEjecucionPresupuestal);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  getRubros(): Observable<any> {
    const url = `${this.baseUrl}/listarRubros`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  verificarExistenciaEjecucion(idCohorte:number): Observable<any> {
    const url = `${this.baseUrl}/verificarExistenciaEjecucion?idCohorte=${idCohorte}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers, responseType: 'text' });
  }

  getIdEjecucionPorCohorte(idCohorte:number): Observable<any> {
    const url = `${this.baseUrl}/obtenerIdEjecucionPorCohorte?idCohorte=${idCohorte}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getEgresosRubroDisponible(rubro:string, ejecucionPresupuestal: number): Observable<any> {
    const url = `${this.baseUrl}/listarPorRubroDisponibles?rubro=${rubro}&idEjecucionPresupuestal=${ejecucionPresupuestal}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  getEncabezadosEgresos(idCdp: string): Observable<any>
  {
    const url = `${this.baseUrl}/encabezadosEgresos?idCdp=${idCdp}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });

  }
  adicionarEgresoGeneralPresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoGeneralCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('concepto', params.concepto)
      .set('valorUnitario', params.valorUnitario)
      .set('cantidad', params.cantidad)
      .set('idTipoCosto', params.tipoCosto)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoInversionPresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoInversionCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('concepto', params.concepto)
      .set('valor', params.valor)
      .set('idTipoInversion', params.idTipoInversion)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }


  adicionarEgresoRecurrentePresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoRecurrenteAdmCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('unidad', params.unidad)
      .set('cargo', params.cargo)
      .set('valorHora', params.valorHora)
      .set('numHoras', params.numHoras)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoViajePresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoViajeCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('descripcion', params.descripcion)
      .set('numPersonas', params.numPersonas)
      .set('apoyoDesplazamiento', params.apoyoDesplazamiento)
      .set('numViajesPorPersona', params.numViajesPorPersona)
      .set('valorTransporte', params.valorTransporte)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }


  adicionarEgresoServDocentePresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoServDocenteCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('nombreMateria', params.nombreMateria)
      .set('esDocentePlanta', params.esDocentePlanta)
      .set('nombreDocente', params.nombreDocente)
      .set('escalafon', params.escalafon)
      .set('titulo', params.titulo)
      .set('horasTeoricasMat', params.horasTeoricasMat)
      .set('horasPracticasMat', params.horasPracticasMat)
      .set('valorHoraProfesor', params.valorHoraProfesor)
      .set('idTipoCompensacion', params.idTipoCompensacion)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoOtrosServDocentePresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoOtroServDocenteCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('servicio', params.servicio)
      .set('descripcion', params.descripcion)
      .set('valorTotal', params.valorTotal)
      .set('numHoras', params.numHoras)
      .set('idTipoCosto', params.idTipoCosto)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoServNoDocentePresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoServNoDocenteCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('servicio', params.servicio)
      .set('cantidad', params.cantidad)
      .set('valorUnitario', params.valorUnitario)
      .set('idTipoCosto', params.idTipoCosto)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoTransferenciaPresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoTransferenciaCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('descripcion', params.descripcion)
      .set('porcentaje', params.porcentaje)
      .set('idTipoTransferencia', params.idTipoTransferencia)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoOtroPresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoOtroCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('concepto', params.concepto)
      .set('valorUnitario', params.valorUnitario)
      .set('cantidad', params.cantidad)
      .set('idTipoCosto', params.idTipoCosto)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  adicionarEgresoDescuentoPresupuesto(params: any) {
    console.log(params);
    const url = `${this.baseUrl}/adicionarEgresoDescuentoCDPDelPresupuesto`;
    const body = new HttpParams()
      .set('idCdp', params.idCdp)
      .set('numEstudiantes', params.numEstudiantes)
      .set('valor', params.valor)
      .set('numPeriodos', params.numPeriodos)
      .set('idTipoDescuento', params.idTipoDescuento)
      .set('idEgresoDelPresupuesto', params.idEgresoDelPresupuesto)
      .set('descripcionEgresoCDP', params.descripcionEgresoCDP)
      .set('cpc', params.cpc);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });

      console.log(body);
  
    return this.http.post(url, body.toString(), { headers, responseType: 'text'  });
  }

  getListaEgresosCDP(idCdp: string): Observable<any>
  {
    const url = `${this.baseUrl}/listarEgresosDelCDP?idCdp=${idCdp}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });

  }
  generarPDFdeCDP(idCdp: string): Observable<any> {
    const url = `${this.baseUrl}/generarReportePDF?idCdp=${idCdp}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers, responseType: 'blob' });
  }
}
