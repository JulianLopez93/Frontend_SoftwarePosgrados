import { Component } from '@angular/core';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { IngresosService } from '@app/services/ingresos.service';
import { EgresosService } from '@app/services/egresos.service';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpresionService } from '@app/services/impresion.service';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css'],
})
export class CrearPresupuestoComponent {
  listaCohortes: any[] = [];
  cohorteSeleccionada: number = 0;
  observaciones: string = '';
  presupuestoForm: FormGroup = new FormGroup({});
  idCohorte: number = 0;
  idPresupuesto: number = 0;
  idPresupuestoString: any;
  numeroCohorte: any;
  programaCohorte: any;
  departamentoCohorte: any;
  facultadCohorte: any;
  ingresosTotales: any; //Ingresos - Descuentos
  egresosTotalesPrograma: any;
  egresosTotalesRecurrentes: any;
  balanceGeneral: any;

  totalEgresosTransferencia: any;
  totalEgresosGenerales: any;
  totalEgresosOtros: any;
  totalEgresosServNoDocentes: any;
  totalEgresosOtrosServDocentes: any;
  totalEgresosInversiones: any;
  totalEgresosRecurrentes: any;
  totalEgresosViajes: any;
  totalEgresosServDocentes: any;
  totalEgresosDescuentos: any;
  totalIngresos: any;
  paginaActual = 1;

  constructor(
    private cohortesService: CohortesService,
    private route: ActivatedRoute,
    private presupuestosServices: PresupuestosService,
    private ingresosServices: IngresosService,
    private impresionService: ImpresionService,
    private egresosServices: EgresosService,
    public dialog: MatDialog,
    private router2: Router,
    private formBuilder: FormBuilder
  ) {
    this.presupuestoForm = this.formBuilder.group({
      observaciones: '',
    });
  }

  ngOnInit() {
    this.idPresupuestoString = localStorage.getItem('idPresupuesto');
    console.log(this.idPresupuestoString);
    console.log(this.paginaActual);

    if (
      sessionStorage.getItem('paginaPresupuesto') == '' ||
      Number(sessionStorage.getItem('paginaPresupuesto')) == 0
    ) {
      this.paginaActual = 1;
    } else {
      this.paginaActual = Number(sessionStorage.getItem('paginaPresupuesto'));
    }
    console.log(this.paginaActual);
    //localStorage.removeItem('idPresupuesto');
    this.idCohorte = parseInt(
      this.route.snapshot.paramMap.get('idCohorte') || ''
    );

    if (this.idPresupuestoString === null) {
      this.crearPresupuesto(this.idCohorte);
    } else {
      this.obtenerPresupuestoPorCohorte(this.idCohorte);
    }

    //this.obtenerCohortes();
  }

  /*
    ngOnDestroy()
    {
      //console.log('Entra al ng On destroy');
      sessionStorage.setItem('paginaPresupuesto', '');
    }
    */

  cambiarPagina(valor: number) {
    this.paginaActual += valor;
    sessionStorage.setItem('paginaPresupuesto', this.paginaActual.toString());
    location.reload();
  }

  obtenerCohortes() {
    this.cohortesService.getCohortes().subscribe(
      (result) => {
        this.listaCohortes = result;
      },
      (error) => {
        console.error('Error al obtener las cohortes:', error);
      }
    );
  }

  enviarParaRevision() {
    this.presupuestosServices
      .sendPresupuestoForReview(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        if (result == 'OK') {
          console.log('Presupuesto guardado');
          this.router2.navigate(['cohortes/listar-cohortes']);
        }
      });
  }

  imprimirReporteEgresos() {
    this.presupuestosServices
      .getPresupuestoPorCohorte(this.idCohorte)
      .subscribe((result: any) => {
        // Define el encabezado de la tabla
        let encabezadoIngresos = ['Concepto', 'Valor'];
        let encabezadoDescuentos = [
          'Cantidad estudiantes',
          'Valor',
          'Número periodos',
          'Tipo descuento',
          'Total descuento',
        ];
        let encabezadoServDocentes = [
          'Nombre materia',
          'Es docente planta',
          'Nombre docente',
          'Escalafón',
          'Título',
          'Horas teóricas',
          'Horas prácticas',
          'Valor hora profesor',
          'Tipo compensación',
          'Pago total',
        ];
        let encabezadoOtrosServDocentes = [
          'Servicio',
          'Descripción',
          'Número horas',
          'Valor total',
          'Tipo costo',
        ];
        let encabezadoServNoDocentes = [
          'Servicio',
          'Valor Unitario',
          'Cantidad',
          'Tipo costo',
          'Valor total',
        ];
        let encabezadoGenerales = [
          'Concepto',
          'Valor unitario',
          'Cantidad',
          'Tipo costo',
          'Valor total',
        ];
        let encabezadoViajes = [
          'Descripción',
          'Número personas',
          'Apoyo desplazamiento',
          'Número viajes por persona',
          'Valor transporte',
          'Valor total',
        ];
        let encabezadoTransferencia = [
          'Descripción',
          'Porcentaje',
          'Tipo transferencia',
          'Valor total',
        ];
        let encabezadoInversion = ['Concepto', 'Valor', 'Tipo inversión'];
        let encabezadoRecurrentesAdm = [
          'Unidad',
          'Cargo',
          'Valor hora',
          'Número horas',
          'Valor total',
        ];
        let encabezadoOtros = [
          'Concepto',
          'Valor unitario',
          'Cantidad',
          'Tipo costo',
          'Valor total',
        ];

        // Recopila los datos de todos los egresos
        let datosTodosEgresos = [
          {
            encabezado: encabezadoIngresos,
            cuerpo: this.formatIngresos(result.ingresos),
            titulo: 'Ingresos',
            total: this.totalIngresos,
          },
          {
            encabezado: encabezadoDescuentos,
            cuerpo: this.formatEgresosDescuentos(result.egresosDescuentos),
            titulo: 'Egresos por descuentos',
            total: this.totalEgresosDescuentos,
          },
          {
            encabezado: encabezadoServDocentes,
            cuerpo: this.formatEgresosServDocentes(result.egresosServDocentes),
            titulo: 'Egresos por servicios Docentes',
            total: this.totalEgresosServDocentes,
          },
          {
            encabezado: encabezadoOtrosServDocentes,
            cuerpo: this.formatEgresosOtrosServDocentes(
              result.egresosOtrosServDocentes
            ),
            titulo: 'Egresos por otros servicios docentes',
            total: this.totalEgresosOtrosServDocentes,
          },
          {
            encabezado: encabezadoServNoDocentes,
            cuerpo: this.formatEgresosServNoDocentes(
              result.egresosServNoDocentes
            ),
            titulo: 'Egresos por servicios no docentes',
            total: this.totalEgresosServNoDocentes,
          },
          {
            encabezado: encabezadoGenerales,
            cuerpo: this.formatEgresosGenerales(result.egresosGenerales),
            titulo: 'Egresos generales',
            total: this.totalEgresosGenerales,
          },
          {
            encabezado: encabezadoViajes,
            cuerpo: this.formatEgresosViajes(result.egresosViaje),
            titulo: 'Egresos por viajes',
            total: this.totalEgresosViajes,
          },
          {
            encabezado: encabezadoTransferencia,
            cuerpo: this.formatEgresosTransferencias(
              result.egresosTransferencias
            ),
            titulo: 'Egresos por transferencias',
            total: this.totalEgresosTransferencia,
          },
          {
            encabezado: encabezadoInversion,
            cuerpo: this.formatEgresosInversiones(result.egresosInversiones),
            titulo: 'Egresos por inversiones',
            total: this.totalEgresosInversiones,
          },
          {
            encabezado: encabezadoRecurrentesAdm,
            cuerpo: this.formatEgresosRecurrentesAdm(
              result.egresosRecurrentesAdm
            ),
            titulo: 'Egresos recurrentes administrativos',
            total: this.totalEgresosRecurrentes,
          },
          {
            encabezado: encabezadoOtros,
            cuerpo: this.formatEgresosOtros(result.egresosOtros),
            titulo: 'Otros egresos',
            total: this.totalEgresosOtros,
          },
        ];

        // Llama al método imprimir del servicio de impresión
        this.impresionService.imprimir(
          datosTodosEgresos.filter((egreso) => egreso.cuerpo.length > 0),
          result,
          true
        );
      });
  }

  formatIngresos(ingresos: any[]) {
    let datosIngresos = [];
    for (let ingreso of ingresos) {
      let filaIngreso = [ingreso.concepto, ingreso.valor];
      datosIngresos.push(filaIngreso);
    }
    datosIngresos.push(['', '']);
    datosIngresos.push(['Total', this.totalIngresos]);
    return datosIngresos;
  }


  formatEgresosGenerales(egresosGenerales: any[]) {
    let datosEgresos = [];
    for (let egreso of egresosGenerales) {
      let filaEgreso = [
        egreso.concepto,
        egreso.valorUnitario,
        egreso.cantidad,
        egreso.tipoCosto.nombreTipo,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', this.totalEgresosGenerales]);
    return datosEgresos;
  }

  formatEgresosDescuentos(egresosDescuentos: any[]) {
    let datosEgresos = [];
    for (let egreso of egresosDescuentos) {
      let filaEgreso = [
        egreso.numEstudiantes,
        egreso.valor,
        egreso.numPeriodos,
        egreso.tipoDescuento.nombreTipo,
        egreso.totalDescuento,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', this.totalEgresosDescuentos]);
    return datosEgresos;
  }

  formatEgresosServDocentes(egresosServDocentes: any[]) {
    let datosEgresos = [];
    for (let egreso of egresosServDocentes) {
      let filaEgreso = [
        egreso.nombreMateria,
        egreso.esDocentePlanta,
        egreso.nombreDocente,
        egreso.escalafon,
        egreso.titulo,
        egreso.horasTeoricasMat,
        egreso.horasPracticasMat,
        egreso.valorHoraProfesor,
        egreso.tipoCompensacion.nombreTipo,
        egreso.totalPagoProfesor,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '', '', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', '', '', '', '', '', this.totalEgresosServDocentes]);
    return datosEgresos;
  }

  formatEgresosOtrosServDocentes(egresosOtrosServDocentes: any[]) {
    let datosEgresos = [];
    for (let egreso of egresosOtrosServDocentes) {
      let filaEgreso = [
        egreso.servicio,
        egreso.descripcion,
        egreso.numHoras,
        egreso.valorTotal,
        egreso.tipoCosto.nombreTipo,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '']);
    datosEgresos.push(['Total', '', '', this.totalEgresosOtrosServDocentes, '']);
    return datosEgresos;
  }

  formatEgresosServNoDocentes(egresosServNoDocentes: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosServNoDocentes) {
      let filaEgreso = [
        egreso.servicio,
        egreso.valorUnitario,
        egreso.cantidad,
        egreso.tipoCosto.nombreTipo,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', this.totalEgresosServNoDocentes]);
    return datosEgresos;
  }

  formatEgresosViajes(egresosViajes: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosViajes) {
      let filaEgreso = [
        egreso.descripcion,
        egreso.numPersonas,
        egreso.apoyoDesplazamiento,
        egreso.numViajesPersona,
        egreso.valorTransporte,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', '', this.totalEgresosViajes]);
    return datosEgresos;
  }

  formatEgresosTransferencias(egresosTransferencias: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosTransferencias) {
      let filaEgreso = [
        egreso.descripcion,
        egreso.porcentaje,
        egreso.tipoTransferencia.nombreTipo,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '']);
    datosEgresos.push(['Total', '', '', this.totalEgresosTransferencia]);
    return datosEgresos;
  }

  formatEgresosInversiones(egresosInversiones: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosInversiones) {
      let filaEgreso = [
        egreso.concepto,
        egreso.valor,
        egreso.tipoInversion.nombreTipo,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '']);
    datosEgresos.push(['Total', this.totalEgresosInversiones]);
    return datosEgresos;
  }

  formatEgresosRecurrentesAdm(egresosRecurrentesAdm: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosRecurrentesAdm) {
      let filaEgreso = [
        egreso.unidad,
        egreso.cargo,
        egreso.valorHora,
        egreso.numHoras,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', ''])
    datosEgresos.push(['Total', '', '', '', this.totalEgresosRecurrentes]);
    return datosEgresos;
  }

  formatEgresosOtros(egresosOtros: any[]) {
    let datosEgresos = [];

    for (let egreso of egresosOtros) {
      let filaEgreso = [
        egreso.concepto,
        egreso.valorUnitario,
        egreso.cantidad,
        egreso.tipoCosto.nombreTipo,
        egreso.valorTotal,
      ];
      datosEgresos.push(filaEgreso);
    }
    datosEgresos.push(['', '', '', '', '']);
    datosEgresos.push(['Total', '', '', '', this.totalEgresosOtros]);
    return datosEgresos;
  }

  redirectTo() {
    this.router2.navigate(['cohortes/listar-cohortes']);
  }

  obtenerTotalEgresosTransferencia() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosTransferencia(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosTransferencia = result;
      });
  }

  obtenerTotalEgresosGenerales() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosGenerales(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosGenerales = result;
      });
  }

  obtenerTotalEgresosOtros() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosOtros(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosOtros = result;
      });
  }

  obtenerTotalEgresosServiciosNoDocentes() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosServiciosNoDocentes(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosServNoDocentes = result;
      });
  }

  obtenerTotalEgresosOtrosServiciosDocentes() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosOtrosServiciosDocentes(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosOtrosServDocentes = result;
      });
  }

  obtenerTotalEgresosInversiones() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosInversiones(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosInversiones = result;
      });
  }

  obtenerTotalEgresosRecurrentes() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosRecurrentes(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosRecurrentes = result;
      });
  }

  obtenerTotalEgresosViajes() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosViajes(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosViajes = result;
      });
  }

  obtenerTotalEgresosServiciosDocentes() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosServiciosDocentes(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosServDocentes = result;
      });
  }

  obtenerTotalEgresosDescuentos() {
    console.log(this.idPresupuesto);
    this.egresosServices
      .getTotalEgresosDescuentos(this.idPresupuesto)
      .subscribe((result: any) => {
        console.log(result);
        this.totalEgresosDescuentos = result;
      });
  }

  obtenerTotalIngresos() {
    console.log(this.idPresupuesto);
    this.ingresosServices.getTotalIngresos(this.idPresupuesto).subscribe((result: any) => {
      console.log(result);
      this.totalIngresos = result;
    });
  }

  crearPresupuesto(idCohorte: any) {
    try {
      console.log(idCohorte);
      //console.log(this.cohorteSeleccionada);
      //console.log(this.observaciones);

      const params = {
        idCohorte: idCohorte,
      };
      //console.log(this.presupuestoForm.value);
      console.log(params);
      this.presupuestosServices
        .postPresupuesto(params)
        .subscribe((result: any) => {
          console.log(result);
          if ((result = 'OK')) {
            console.log('Presupuesto guardado');
            this.obtenerPresupuestoPorCohorte(idCohorte);
            //this.router2.navigate(['presupuestos/listar-presupuestos']);
          }
        });
    } catch (error) { }
  }

  obtenerPresupuestoPorCohorte(idCohorte: number) {
    console.log(idCohorte);
    this.presupuestosServices
      .getPresupuestoPorCohorte(idCohorte)
      .subscribe((result?: any) => {
        console.log(result);
        this.idPresupuesto = result?.id;
        this.numeroCohorte = result?.cohorte.numero;
        this.programaCohorte = result?.cohorte.programa.nombre;
        this.facultadCohorte =
          result?.cohorte.programa.facultad.nombre;
        this.ingresosTotales = result?.ingresosTotales;
        this.egresosTotalesPrograma = result?.egresosProgramaTotales;
        this.egresosTotalesRecurrentes =
          result?.egresosRecurrentesUniversidadTotales;
        this.balanceGeneral = result?.balanceGeneral;


        this.obtenerTotalEgresosTransferencia();
        this.obtenerTotalEgresosGenerales();
        this.obtenerTotalEgresosInversiones();
        this.obtenerTotalEgresosOtros();
        this.obtenerTotalEgresosOtrosServiciosDocentes();
        this.obtenerTotalEgresosRecurrentes();
        this.obtenerTotalEgresosServiciosNoDocentes();
        this.obtenerTotalEgresosViajes();
        this.obtenerTotalEgresosServiciosDocentes();
        this.obtenerTotalEgresosDescuentos();
        this.obtenerTotalIngresos();

        console.log(this.idPresupuesto);
        console.log(this.numeroCohorte);
        console.log(this.programaCohorte);
        console.log(this.ingresosTotales);
        console.log(this.egresosTotalesPrograma);
        console.log(this.egresosTotalesRecurrentes);
        console.log(this.balanceGeneral);


        console.log(result.id);
        localStorage.setItem('idPresupuesto', result.id);

        console.log(this.idPresupuesto);
      },
      (error) => {
        console.error('Error al obtener el presupuesto:', error);
        // Aquí puedes tomar medidas para manejar el error, como mostrar un mensaje al usuario o hacer alguna acción para recuperarse.
      });
  }
}
