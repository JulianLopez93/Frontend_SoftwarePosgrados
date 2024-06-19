import { Component } from '@angular/core';

import { ProgramasService } from '@app/services/programas.service';
import { CohortesService } from '@app/services/cohortes.service';

import { EgresosService } from '@app/services/egresos.service';
import { EjecucionPresupuestalService } from '@app/services/ejecucion-presupuestal.service';
import { CdpService } from '@app/services/cdp.service';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reporte-egresos',
  templateUrl: './reporte-egresos.component.html',
  styleUrls: ['./reporte-egresos.component.css']
})
export class ReporteEgresosComponent {

  idCohorte: number = 0;
  ejecucionPresupuestal: any;
  listaCDPconEgresos: any[] = [];

  listaEgresosGenerales: any[] = [];
  listaEgresosDescuentos: any[] = [];
  listaEgresosViajes: any[] = [];
  listaEgresosTransferencias: any[] = [];
  listaEgresosServDocentes: any[] = [];
  listaEgresosOtrosServDocentes: any[] = [];
  listaEgresosServNoDocentes: any[] = [];
  listaEgresosInversiones: any[] = [];
  listaEgresosOtros: any[] = [];
  listaEgresosRecurrentes: any[] = [];

  egresosGeneralesPlanos: any[] = [];
  egresosServDocentesPlanos: any[] = [];

  mostrarTablaEgresosGenerales: boolean = false
  mostrarTablaEgresosServDocentes: boolean = false

  displayedColumns: string[] = ['cpc', 'descripcionCDP','concepto', 'valorUnitario', 'cantidad', 'valorTotal'];
  displayedSDColumns: string[] = ['cpc', 'descripcionCDP','esDocentePlanta', 'horasPracticasMat', 'horasTeoricasMat', 'nombreDocente', 'nombreMateria', 'titulo', 'totalHorasProfesor', 'valorHoraProfesor', 'totalPagoProfesor'];

  constructor(
    private cohortesService: CohortesService,
    private route: ActivatedRoute,
    private programasService: ProgramasService,
    private ejecucionPresupuestalService: EjecucionPresupuestalService,
    private egresosServices: EgresosService,
    private cdpServices: CdpService,
    public dialog: MatDialog,
    private router2: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    /*
    this.CDPForm = this.formBuilder.group({
      observaciones: '',
    });
    */
  }

  ngOnInit(): void {

    this.idCohorte = parseInt(
      this.route.snapshot.paramMap.get('idCohorte') || ''
    );

    console.log(this.idCohorte);

    this.obtenerEjecucion();
  }

  obtenerEjecucion()
  {
    this.ejecucionPresupuestalService.getEjecucionPorPresupuesto(this.idCohorte).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Ejecucion presupuestal obtenida");
          this.ejecucionPresupuestal = result;
          console.log(this.ejecucionPresupuestal);
          this.obtenerCDPconEgresos();
          //this.obtenerProgramasPorFacultad(this.facultadSeleccionada);
        }
    });
  }

  obtenerCDPconEgresos()
  {
    // Filtrar los CDP que tienen al menos un egreso
    const cdpsConEgresos = this.ejecucionPresupuestal.cdps.filter((cdp: { egresosCDP: string | any[]; }) => cdp.egresosCDP.length > 0);
    
    // Ahora cdpsConEgresos contiene solo los CDP con egresos
    console.log(cdpsConEgresos);
    this.asignarCDPaCadaLista(cdpsConEgresos);
  }

  asignarCDPaCadaLista(cdpsConEgresos:any)
  {
    cdpsConEgresos.forEach((cdp: { rubro: any; }) => {
      switch (cdp.rubro) {
        case 'Generales':
          this.listaEgresosGenerales.push(cdp);
          break;
        case 'Descuentos':
          this.listaEgresosDescuentos.push(cdp);
          break;
        case 'Viajes':
          this.listaEgresosViajes.push(cdp);
          break;
        case 'Transferencias':
          this.listaEgresosTransferencias.push(cdp);
          break;
        case 'Inversiones':
          this.listaEgresosInversiones.push(cdp);
          break;
        case 'Recurrentes Administrativos':
          this.listaEgresosRecurrentes.push(cdp);
          break;
        case 'Servicios Docentes':
          this.listaEgresosServDocentes.push(cdp);
          break;
        case 'Servicios No Docentes':
          this.listaEgresosServNoDocentes.push(cdp);
          break;
        case 'Otros Servicios Docentes':
          this.listaEgresosOtrosServDocentes.push(cdp);
          break;
        case 'Otros':
          this.listaEgresosOtros.push(cdp);
          break;
        
        default:
        
          // Si no coincide con ningún rubro específico, puedes manejarlo aquí
          break;
      }
    });

    this.imprimirListas();
    this.obtenerEgresosGeneralesPlanos()
    this.obtenerEgresosServDocentesPlanos();

  }

  obtenerEgresosGeneralesPlanos()
  {
    for (const cdp of this.listaEgresosGenerales) {
      for (const egresoCDP of cdp.egresosCDP) {
        this.egresosGeneralesPlanos.push(egresoCDP);
      }
    }

    console.log(this.egresosGeneralesPlanos);
    this.mostrarTablaEgresosGenerales = true;
  }

  obtenerEgresosServDocentesPlanos()
  {
    for (const cdp of this.listaEgresosServDocentes) {
      for (const egresoCDP of cdp.egresosCDP) {
        this.egresosServDocentesPlanos.push(egresoCDP);
      }
    }

    console.log(this.egresosServDocentesPlanos);
    this.mostrarTablaEgresosServDocentes = true;
  }

  imprimirListas()
  {
    console.log(this.listaEgresosGenerales)
    console.log(this.listaEgresosDescuentos)
    console.log(this.listaEgresosInversiones)
    console.log(this.listaEgresosOtros)
    console.log(this.listaEgresosOtrosServDocentes)
    console.log(this.listaEgresosRecurrentes)
    console.log(this.listaEgresosServDocentes)
    console.log(this.listaEgresosServNoDocentes)
    console.log(this.listaEgresosTransferencias)
    console.log(this.listaEgresosViajes)
  }
  

}
