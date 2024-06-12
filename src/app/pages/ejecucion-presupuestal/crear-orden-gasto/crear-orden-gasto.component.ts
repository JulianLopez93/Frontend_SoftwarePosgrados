import { Component } from '@angular/core';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { IngresosService } from '@app/services/ingresos.service';
import { EgresosService } from '@app/services/egresos.service';
import { CdpService } from '@app/services/cdp.service';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-orden-gasto',
  templateUrl: './crear-orden-gasto.component.html',
  styleUrls: ['./crear-orden-gasto.component.css']
})
export class CrearOrdenGastoComponent {
  listaCohortes: any[] = [];
  listaRubros: any[] = [];
  listaEgresosRubros: any[] = [];
  cohorteSeleccionada: number = 0;
  p: number = 1;
  displayedColumns: string[] = ['concepto', 'unidad', 'cargo', 'servicio', 'descripcion', 'porcentaje', 'numPersonas', 'apoyoDesplazamiento', 'numViajesPorPersona', 'valorTransporte', 'numHoras', 'valorHora', 'valorUnitario', 'cantidad', 'tipoCosto',
    'valor','valorTotal', 'nombreMateria', 'esDocentePlanta', 'nombreDocente', 'escalafon', 'titulo', 'acciones',
  'horasTeoricasMat', 'horasPracticasMat', 'valorHoraProfesor', 'tipoDescuento','tipoCompensacion', 'tipoTransferencia', 'totalPagoProfesor',
  'tipoInversion','cantidadEstudiantes', 'numeroPeriodos','totalDescuento'];
  //rubroSeleccionado:string = '';
  //observaciones: string = '';
  CDPForm: FormGroup = new FormGroup({});
  idCohorte: number = 0;
  idPresupuesto: number = 0;
  idPresupuestoString: any;
  numeroCohorte: any;
  programaCohorte: any;
  departamentoCohorte: any;
  facultadCohorte: any;
  paginaActual = 1;

  constructor(
    private cohortesService: CohortesService,
    private route: ActivatedRoute,
    private presupuestosServices: PresupuestosService,
    private ingresosServices: IngresosService,
    private egresosServices: EgresosService,
    private cdpServices: CdpService,
    public dialog: MatDialog,
    private router2: Router,
    private formBuilder: FormBuilder
  ) {
    /*
    this.CDPForm = this.formBuilder.group({
      observaciones: '',
    });
    */
  }

  ngOnInit(): void {
    this.CDPForm = this.formBuilder.group({
      rubroSeleccionado: ['']
    });

    this.idPresupuestoString = parseInt(
      this.route.snapshot.paramMap.get('idPresupuesto') || ''
    );
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
    this.prellenarCampos();
    this.obtenerRoles();

    //this.obtenerCohortes();
  }

  obtenerRoles()
  {
    this.cdpServices.getRubros().subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Entra condicional");
          this.listaRubros = result;
          console.log(this.listaRubros);

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
  }

  obtenerEgresosDesdePresupuesto()
  {
    this.cdpServices.getEgresosRubroDisponible(this.rubroSeleccionado).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Entra condicional");
          this.listaEgresosRubros = result;
          console.log(this.listaEgresosRubros);

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
  }

  get rubroSeleccionado() {
    return this.CDPForm.get('rubroSeleccionado')?.value;
  }

  prellenarCampos()
  {
    this.facultadCohorte = sessionStorage.getItem('nombreFacultad');
    this.programaCohorte = sessionStorage.getItem('nombrePrograma');
    this.numeroCohorte = sessionStorage.getItem('idCohorte');
  }

}
