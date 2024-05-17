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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  
  getEgresosTransferenciaPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoTransferencia/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  
  getTotalEgresosTransferencia(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoTransferencia/totalEgresosTransferencias?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }
  
  postEgresoTransferencia(params: any) {
    const url = `${this.baseUrl}/egresoTransferencia/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('descripcion', params.descripcion)
      .set('porcentaje', params.porcentaje)
      .set('idTipoTransferencia', params.idTipoTransferencia);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }
  
  editEgresoTransferencia(id: number, descripcion: string, porcentaje: number, idTipoTransferencia: number) {
    const url = `${this.baseUrl}/egresoTransferencia/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('descripcion', descripcion)
      .set('porcentaje', porcentaje)
      .set('idTipoTransferencia', idTipoTransferencia);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }
  
  deleteEgresoTransferencia(id: string) {
    const url = `${this.baseUrl}/egresoTransferencia/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }


  getEgresosGenerales(): Observable<any> {
    const url = `${this.baseUrl}/egresoGeneral/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosGenerales(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoGeneral/totalEgresosGenerales?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosGeneralesPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoGeneral/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoGeneral(params: any) {
    const url = `${this.baseUrl}/egresoGeneral/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('concepto', params.concepto)
      .set('valorUnitario', params.valorUnitario)
      .set('cantidad', params.cantidad)
      .set('idTipoCosto', params.idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoGeneral(id: number, concepto: string, valorUnitario: number, cantidad: number, idTipoCosto: number) {
    const url = `${this.baseUrl}/egresoGeneral/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('concepto', concepto)
      .set('valorUnitario', valorUnitario)
      .set('cantidad', cantidad)
      .set('idTipoCosto', idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoGeneral(id: string) {
    const url = `${this.baseUrl}/egresoGeneral/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosOtros(): Observable<any> {
    const url = `${this.baseUrl}/egresoOtro/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosOtrosPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoOtro/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosOtros(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoOtro/totalEgresosOtros?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoOtros(params: any) {
    const url = `${this.baseUrl}/egresoOtro/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('concepto', params.concepto)
      .set('valorUnitario', params.valorUnitario)
      .set('cantidad', params.cantidad)
      .set('idTipoCosto', params.idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoOtros(id: number, concepto: string, valorUnitario: number, cantidad: number, idTipoCosto: number) {
    const url = `${this.baseUrl}/egresoOtro/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('concepto', concepto)
      .set('valorUnitario', valorUnitario)
      .set('cantidad', cantidad)
      .set('idTipoCosto', idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoOtros(id: string) {
    const url = `${this.baseUrl}/egresoOtro/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosServiciosNoDocente(): Observable<any> {
    const url = `${this.baseUrl}/egresoServNoDocente/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosServiciosNoDocentePorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoServNoDocente/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosServiciosNoDocentes(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoServNoDocente/totalEgresosServNoDocentes?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoServiciosNoDocente(params: any) {
    const url = `${this.baseUrl}/egresoServNoDocente/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('servicio', params.servicio)
      .set('valorUnitario', params.valorUnitario)
      .set('cantidad', params.cantidad)
      .set('idTipoCosto', params.idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoServiciosNoDocente(id: number, servicio: string, valorUnitario: number, cantidad: number, idTipoCosto: number) {
    const url = `${this.baseUrl}/egresoServNoDocente/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('servicio', servicio)
      .set('valorUnitario', valorUnitario)
      .set('cantidad', cantidad)
      .set('idTipoCosto', idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoServiciosNoDocente(id: string) {
    const url = `${this.baseUrl}/egresoServNoDocente/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosOtrosServiciosDocente(): Observable<any> {
    const url = `${this.baseUrl}/egresoOtrosServDocente/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosOtrosServiciosDocentePorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoOtrosServDocente/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosOtrosServiciosDocentes(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoOtrosServDocente/totalEgresosOtrosServDocentes?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoOtrosServiciosDocente(params: any) {
    const url = `${this.baseUrl}/egresoOtrosServDocente/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('servicio', params.servicio)
      .set('descripcion', params.descripcion)
      .set('numHoras', params.numHoras)
      .set('valorTotal', params.valorTotal)
      .set('idTipoCosto', params.idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoOtrosServiciosDocente(id: number, servicio: string, descripcion: string, numHoras: number, valorTotal: number, idTipoCosto: number) {
    const url = `${this.baseUrl}/egresoOtrosServDocente/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('servicio', servicio)
      .set('descripcion', descripcion)
      .set('numHoras', numHoras)
      .set('valorTotal', valorTotal)
      .set('idTipoCosto', idTipoCosto);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoOtrosServiciosDocente(id: string) {
    const url = `${this.baseUrl}/egresoOtrosServDocente/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosInversion(): Observable<any> {
    const url = `${this.baseUrl}/egresoInversion/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosInversiones(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoInversion/totalEgresosInversiones?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosInversionPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoInversion/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoInversion(params: any) {
    const url = `${this.baseUrl}/egresoInversion/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('concepto', params.concepto)
      .set('valor', params.valor)
      .set('idTipoInversion', params.idTipoInversion);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoInversion(id: number, concepto: string, valor: number, idTipoInversion: number) {
    const url = `${this.baseUrl}/egresoInversion/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('concepto', concepto)
      .set('valor', valor)
      .set('idTipoInversion', idTipoInversion);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoInversion(id: string) {
    const url = `${this.baseUrl}/egresoInversion/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  
  getEgresosRecurrentes(): Observable<any> {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosRecurrentes(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/totalEgresosRecurrentesAdm?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosRecurrentesPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoRecurrente(params: any) {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('unidad', params.unidad)
      .set('cargo', params.cargo)
      .set('valorHora', params.valorHora)
      .set('numHoras', params.numHoras);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoRecurrente(id: number, unidad: string, cargo: string, valorHora: number, numHoras: number,) {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('unidad', unidad)
      .set('cargo', cargo)
      .set('valorHora', valorHora)
      .set('numHoras', numHoras);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoRecurrente(id: string) {
    const url = `${this.baseUrl}/egresoRecurrenteAdm/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosViajes(): Observable<any> {
    const url = `${this.baseUrl}/egresoViaje/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosViajes(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoViaje/totalEgresosViajes?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosViajesPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoViaje/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  postEgresoViajes(params: any) {
    const url = `${this.baseUrl}/egresoViaje/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('descripcion', params.descripcion)
      .set('numPersonas', params.numPersonas)
      .set('apoyoDesplazamiento', params.apoyoDesplazamiento)
      .set('numViajesPorPersona', params.numViajesPorPersona)
      .set('valorTransporte', params.valorTransporte);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoViajes(id: number, descripcion: string, numPersonas: number,
    apoyoDesplazamiento: number, numViajesPorPersona: number, valorTransporte: number) {
    const url = `${this.baseUrl}/egresoViaje/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('descripcion', descripcion)
      .set('numPersonas', numPersonas)
      .set('apoyoDesplazamiento', apoyoDesplazamiento)
      .set('numViajesPorPersona', numViajesPorPersona)
      .set('valorTransporte', valorTransporte);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoViajes(id: string) {
    const url = `${this.baseUrl}/egresoViaje/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }

  getEgresosServiciosDocentes(): Observable<any> {
    const url = `${this.baseUrl}/egresoServDocente/listar`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosServiciosDocentes(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoServDocente/totalEgresosServDocentes?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getEgresosServiciosDocentesPorPresupuesto(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoServDocente/listarPorPresupuesto?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }

  getTotalEgresosDescuentos(idPresupuesto: number): Observable<any> {
    const url = `${this.baseUrl}/egresoDescuento/totalEgresosDescuentos?idPresupuesto=${idPresupuesto}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.get(url, { headers });
  }



  postEgresoServiciosDocentes(params: any) {
    const url = `${this.baseUrl}/egresoServDocente/crear`;
    const body = new HttpParams()
      .set('idPresupuestoEjecucion', params.idPresupuestoEjecucion)
      .set('nombreMateria', params.nombreMateria)
      .set('esDocentePlanta', params.esDocentePlanta)
      .set('nombreDocente', params.nombreDocente)
      .set('escalafon', params.escalafon)
      .set('titulo', params.titulo)
      .set('horasTeoricasMat', params.horasTeoricasMat)
      .set('horasPracticasMat', params.horasPracticasMat)
      .set('valorHoraProfesor', params.valorHoraProfesor)
      .set('idTipoCompensacion', params.idTipoCompensacion);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.post(url, body.toString(), { headers, responseType: 'text' });
  }

  editEgresoServiciosDocentes(id: number, nombreMateria: string,
    esDocentePlanta: boolean, nombreDocente: string,
    escalafon: string, titulo: string, horasTeoricasMat: number,
    horasPracticasMat: number, valorHoraProfesor: number,
    idTipoCompensacion: number) {
    const url = `${this.baseUrl}/egresoServDocente/actualizar`;
    const params = new HttpParams()
      .set('id', id)
      .set('nombreMateria', nombreMateria)
      .set('esDocentePlanta', esDocentePlanta)
      .set('nombreDocente', nombreDocente)
      .set('escalafon', escalafon)
      .set('titulo', titulo)
      .set('horasTeoricasMat', horasTeoricasMat)
      .set('horasPracticasMat', horasPracticasMat)
      .set('valorHoraProfesor', valorHoraProfesor)
      .set('idTipoCompensacion', idTipoCompensacion);
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      });
      return this.http.put(url, params.toString(), { headers, responseType: 'text' });
  }

  deleteEgresoServiciosDocentes(id: string) {
    const url = `${this.baseUrl}/egresoServDocente/eliminar?id=${id}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('authToken')
    });
    return this.http.delete(url, { headers, responseType: 'text' });
  }


}
