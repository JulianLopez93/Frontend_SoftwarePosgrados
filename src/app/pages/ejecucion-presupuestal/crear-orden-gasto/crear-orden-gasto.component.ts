import { Component } from '@angular/core';
import { FacultadesServicioService } from '@app/services/facultades-servicio.service';
import { ProgramasService } from '@app/services/programas.service';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { IngresosService } from '@app/services/ingresos.service';
import { EgresosService } from '@app/services/egresos.service';
import { EjecucionPresupuestalService } from '@app/services/ejecucion-presupuestal.service';
import { CdpService } from '@app/services/cdp.service';

import { PopupCrearEditarEgresoComponent } from '@app/shared/popup-crear-editar-egreso/popup-crear-editar-egreso.component';
import { PopupConfirmarRubroComponent } from './popup-confirmar-rubro/popup-confirmar-rubro.component';
import { PopupCrearEditarComponent } from '@app/shared/popup-crear-editar/popup-crear-editar.component';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-orden-gasto',
  templateUrl: './crear-orden-gasto.component.html',
  styleUrls: ['./crear-orden-gasto.component.css']
})
export class CrearOrdenGastoComponent {
  listaCohortes: any[] = [];
  listaFacultades: any[] = [];
  listaProgramas: any[] = [];
  listaRubros: any[] = [];
  listaEgresosRubros: any[] = [];
  listaEgresosCDP: any[] = [];
  listaEncabezados: any[] = [];
  listaEncabezadosCDPAgregados: any[] = [];
  //cohorteSeleccionada: number = 0;
  p: number = 1;
  displayedColumns: string[] = [];
  displayedCDPColumns: string[] = [];
  //rubroSeleccionado:string = '';
  //observaciones: string = '';
  CDPForm: FormGroup = new FormGroup({});
  idCohorte: number = 0;
  idPresupuesto: number = 0;
  idPresupuestoString: any;
  idEjecucion:any;
  idCdp:any;
  presupuesto:any;
  ejecucionPresupuestal:any;
  numeroCohorte: any;
  programaCohorte: any;
  departamentoCohorte: any;
  facultadCohorte: any;
  mostrarTablaEgresos:boolean = false;
  mostrarSeccionEgresos: boolean = false;
  mostrarSeccionEgresosCDP: boolean = false;
  mostrarTablaEgresosCDP: boolean = false;
  activarCampos: boolean = true;
  paginaActual = 1;

  constructor(
    private cohortesService: CohortesService,
    private route: ActivatedRoute,
    private facultadesService: FacultadesServicioService,
    private programasService: ProgramasService,
    private presupuestosService: PresupuestosService,
    private ejecucionPresupuestalService: EjecucionPresupuestalService,
    private ingresosServices: IngresosService,
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
    this.CDPForm = this.formBuilder.group({
      rubroSeleccionado: [''],
      facultadSeleccionada: [''],
      programaSeleccionado: [''],
      cohorteSeleccionada: ['']
    });

    /*
    this.idPresupuestoString = parseInt(
      this.route.snapshot.paramMap.get('idPresupuesto') || ''
    );
    console.log(this.idPresupuestoString);
    */
    console.log(this.paginaActual);

    /*
    if (
      sessionStorage.getItem('paginaPresupuesto') == '' ||
      Number(sessionStorage.getItem('paginaPresupuesto')) == 0
    ) {
      this.paginaActual = 1;
    } else {
      this.paginaActual = Number(sessionStorage.getItem('paginaPresupuesto'));
    }
      */
    console.log(this.paginaActual);
    //localStorage.removeItem('idPresupuesto');
    this.idCohorte = parseInt(
      this.route.snapshot.paramMap.get('idCohorte') || ''
    );
    //this.prellenarCampos();
    this.obtenerFacultades();
    //this.obtenerRubros();

    //this.obtenerCohortes();
  }

  obtenerFacultades()
  {
    this.facultadesService.getFacultades().subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Facultades obtenidas");
          this.listaFacultades = result;
          console.log(this.listaFacultades);
          //this.obtenerProgramasPorFacultad(this.facultadSeleccionada);
        }
    });
  }
  onFacultadChange(event: any) {
    const idFacultad = event.value;
    this.obtenerProgramasPorFacultad(idFacultad);
  }

  obtenerProgramasPorFacultad(idFacultad:number)
  {
    console.log(idFacultad);
    this.programasService.getProgramasPorFacultad(idFacultad).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Programas obtenidos");
          this.listaProgramas = result;
          //this.obtenerCohortesPorPrograma(this.programaSeleccionado);
        }
    });

  }

  onProgramaChange(event: any) {
    const idPrograma = event.value;
    this.obtenerCohortesPorPrograma(idPrograma);
  }

  onCohorteChange(event: any) {
    const idCohorte = event.value;
    this.verificarExistenciaEjecucion(idCohorte)
    //this.obtenerRubros();
  }
  onRubroChange(event: any) {
    const rubro = event.value;
    this.openConfirmationDialog(rubro);
    //this.crearCDP(rubro);
  }

  obtenerCohortesPorPrograma(idPrograma:string)
  {
    this.cohortesService.getCohortesPorPrograma(idPrograma).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Cohortes obtenidas");
          this.listaCohortes = result;
          //this.obtenerRubros();
        }
    });

  }

  verificarExistenciaEjecucion(cohorteId:number)
  {
    this.cdpServices.verificarExistenciaEjecucion(cohorteId).subscribe((result:any) =>{
      console.log(result);
      if (result == 'OK')
      {
        console.log("Ejecucion existente");
        this.obtenerIdEjecucionPorCohorte(cohorteId);

      }
      else
      {
        //this.openBudgetCreationDialog(cohorte);
      }
          
    });

  }

  /*
  obtenerPresupuestoPorCohorte(cohorte:any)
  {
    this.presupuestosService.getPresupuestoPorCohorte(cohorte.id).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
      {
        console.log("Entra condicional");
        this.presupuesto = result;
        console.log(this.presupuesto);
        this.obtenerEjecucionPorPresupuesto(this.presupuesto);

      }
      else
      {
        //this.openBudgetCreationDialog(cohorte);
      }
          
    });

  }
  */
 
  obtenerIdEjecucionPorCohorte(cohorteId:number)
  {
    this.cdpServices.getIdEjecucionPorCohorte(cohorteId).subscribe((result:any) =>{
      console.log(result);
      if (result != null)
      {
        console.log("id ejecucion por cohorte obtenido");
        this.idEjecucion = result;
        console.log(this.idEjecucion);
        this.obtenerRubros();
      }
      else
      {
        //this.openBudgetCreationDialog(cohorte);
      }
          
    });

  }

  obtenerRubros(){
    this.cdpServices.getRubros().subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Rubros obtenidos");
          this.listaRubros = result;
          console.log(this.listaRubros);
          console.log(this.mostrarTablaEgresos);

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
  }

  obtenerEgresosDesdePresupuesto()
  {
    this.cdpServices.getEgresosRubroDisponible(this.rubroSeleccionado, this.idEjecucion).subscribe((result:any) =>{
      console.log(result);
      if (result !== null)
        {
          console.log("Egresos desde presupuesto obtenidos");
          this.listaEgresosRubros = result;
          console.log(this.listaEgresosRubros);
          this.mostrarTablaEgresos = true;
          console.log(this.mostrarTablaEgresos);

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
  }

  
  crearCDP(rubro:string)
  {
    const params = 
    {
      rubro: rubro,
      idEjecucionPresupuestal: this.idEjecucion
    }

    this.cdpServices.postCDP(params).subscribe((result:any) => {
      console.log(result);
      if (result !== null)
        {
          console.log("CDP creado");
          this.idCdp = result;
          this.obtenerEncabezadosEgresos();
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  obtenerEncabezadosEgresos()
  {
    this.cdpServices.getEncabezadosEgresos(this.idCdp).subscribe((result:any) =>{
      //console.log(result);
      if (result !== null)
        {
          console.log("Encabezados egresos obtenidos");
          this.listaEncabezados = result;
          console.log(this.listaEncabezados);
          this.displayedColumns = this.listaEncabezados;
          this.listaEncabezados.push('acciones');

        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
          
    });
  }
  obtenerEncabezadosEgresosCDPAgregados()
  {
    this.cdpServices.getEncabezadosEgresos(this.idCdp).subscribe((result:any) =>{
      //console.log(result);
      if (result !== null)
        {
          console.log("Entra condicional");
          this.listaEncabezadosCDPAgregados = result;
          console.log(this.listaEncabezadosCDPAgregados);
          this.displayedCDPColumns = this.listaEncabezadosCDPAgregados;
          this.displayedCDPColumns.push('descripcionCDP');
          this.displayedCDPColumns.push('cpc');
          //this.displayedCDPColumns.push('acciones');
          this.mostrarSeccionEgresosCDP=true;
          this.mostrarTablaEgresosCDP = true;
          

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
  get facultadSeleccionada() {
    return this.CDPForm.get('facultadSeleccionada')?.value;
  }
  get programaSeleccionado() {
    return this.CDPForm.get('programaSeleccionado')?.value;
  }
  get cohorteSeleccionada() {
    return this.CDPForm.get('cohorteSeleccionada')?.value;
  }

  openCreateDialog(modulo: string, egreso?: any): void {
    console.log(egreso);
    console.log(this.idPresupuesto);

    const tipoPerteneciente = ['Generales', 'Otros', 'Otros Servicios Docentes', 'Servicios No Docentes'].includes(this.rubroSeleccionado)
    ? egreso.tipoCosto
    : this.rubroSeleccionado === 'Transferencias'
    ? egreso.tipoTransferencia
    : this.rubroSeleccionado === 'Servicios Docentes'
    ? egreso.tipoCompensacion
    : this.rubroSeleccionado === 'Inversiones'
    ? egreso.tipoInversion
    : this.rubroSeleccionado === 'Descuentos'
    ? egreso.tipoDescuento
    : null;

  if (modulo !== 'descuento')
  {
    const dialogRef = this.dialog.open(PopupCrearEditarEgresoComponent, {
      width: '350px',
      data: {
        modulo: modulo,
        isCreacionCDP: 'Si',
        concepto: egreso ? egreso.concepto : '',
        valor: egreso ? egreso.valor : '',
        valorUnitario: egreso ? egreso.valorUnitario : '',
        valorTotal: egreso ? egreso.valorTotal : '',
        cantidad: egreso ? egreso.cantidad : '',
        unidad: egreso ? egreso.unidad : '',
        cargo: egreso ? egreso.cargo : '',
        valorHora: egreso ? egreso.valorHora : '',
        numHoras: egreso ? egreso.numHoras : '',
        nombreMateria: egreso ? egreso.nombreMateria : '',
        esDocentePlanta: egreso ? egreso.esDocentePlanta : '',
        nombreDocente: egreso ? egreso.nombreDocente : '',
        escalafon: egreso ? egreso.escalafon : '',
        titulo: egreso ? egreso.titulo : '',
        horasTeoricasMat: egreso ? egreso.horasTeoricasMat : '',
        horasPracticasMat: egreso ? egreso.horasPracticasMat : '',
        valorHoraProfesor: egreso ? egreso.valorHoraProfesor : '',
        descripcion: egreso ? egreso.descripcion : '',
        numPersonas: egreso ? egreso.numPersonas : '',
        apoyoDesplazamiento: egreso ? egreso.apoyoDesplazamiento : '',
        numViajesPorPersona: egreso ? egreso.numViajesPorPersona : '',
        valorTransporte: egreso ? egreso.valorTransporte : '',
        servicio: egreso ? egreso.servicio : '',
        porcentaje: egreso ? egreso.porcentaje : '',
        isEdit: !!egreso,
        tipoPerteneciente: tipoPerteneciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (egreso) {
          console.log("Edita egreso");
          this.agregarEgresoDesdePresupuesto(result, modulo, egreso.id)
        } else {
          console.log("Crea egreso");
          //this.crearEgresoGeneral(this.idPresupuesto, result.concepto, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
        }
      }

    });

  }

  else
  {
    const dialogRef = this.dialog.open(PopupCrearEditarComponent, {
      width: '350px',
      data: {
        modulo: modulo,
        isCreacionCDP: 'Si',
        valor: egreso ? egreso.valor : '',
        numEstudiantes: egreso ? egreso.numEstudiantes : '',
        numPeriodos: egreso ? egreso.numPeriodos : '',
        isEdit: !!egreso,
        tipoPerteneciente: tipoPerteneciente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result) {
        if (egreso) {
          console.log("Edita egreso");
          this.agregarEgresoDesdePresupuesto(result, modulo, egreso.id)
        } else {
          console.log("Crea egreso");
          //this.crearEgresoGeneral(this.idPresupuesto, result.concepto, result.valorUnitario, result.cantidad, result.entidadPerteneciente);
        }
      }

    });
  }
  
  
  }

  determinarModulo(rubroSeleccionado: string, egreso:any)
  {
    let modulo: string = '';
    switch(rubroSeleccionado)
    {
      case 'Generales':
        modulo = 'egreso general'
        break;
      case 'Recurrentes Administrativos':
        modulo = 'egreso recurrente'
        break;
      case 'Inversiones':
        modulo = 'egreso inversion'
        break;
      case 'Viajes':
        modulo = 'egreso viaje'
        break;
      case 'Otros Servicios Docentes':
        modulo = 'egreso otros servicios docente'
        break;
      case 'Servicios Docentes':
        modulo = 'egreso servicio docente'
        break;
      case 'Servicios No Docentes':
        modulo = 'egreso servicio no docente'
        break;
      case 'Descuentos':
        modulo = 'descuento'
        break;
      case 'Transferencias':
        modulo = 'egreso transferencia'
        break;
      case 'Otros':
        modulo = 'otro egreso'
        break;

    }

    /*
    if (modulo !== 'descuento')
      {
        this.openCreateDialog(modulo, egreso)
      }
        */

      this.openCreateDialog(modulo, egreso)
  }

  agregarEgresoDesdePresupuesto(resultado: any, modulo: string, egresoId: number)
  {
    if (modulo == 'egreso general')
    {
      this.adicionarEgresoGeneralPresupuesto(resultado, egresoId);

    }
    else if (modulo == 'egreso recurrente')
    {
      this.adicionarEgresoRecurrentePresupuesto(resultado, egresoId);

    }

    else if (modulo == 'egreso servicio docente')
    {
      this.adicionarEgresoServDocentePresupuesto(resultado, egresoId);

    }

    else if (modulo == 'egreso inversion')
    {
      this.adicionarEgresoInversionPresupuesto(resultado, egresoId);

    }

    else if (modulo == 'egreso viaje')
    {
      this.adicionarEgresoViajePresupuesto(resultado, egresoId);

    }
    else if (modulo == 'egreso otros servicios docente')
    {
      this.adicionarEgresoOtrosServDocentePresupuesto(resultado, egresoId);

    }
    else if (modulo == 'egreso servicio no docente')
    {
      this.adicionarEgresosServNoDocentePresupuesto(resultado, egresoId);

    }
    else if (modulo == 'egreso transferencia')
    {
      this.adicionarEgresoTransferenciaPresupuesto(resultado, egresoId);

    }
    else if (modulo == 'otro egreso')
    {
      this.adicionarEgresoOtroPresupuesto(resultado, egresoId);

    }
    else if (modulo == 'descuento')
    {
      this.adicionarEgresoDescuentoPresupuesto(resultado, egresoId);

    }
    

  }

  adicionarEgresoGeneralPresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      concepto: resultado.concepto,
      valorUnitario: resultado.valorUnitario,
      cantidad: resultado.cantidad,
      tipoCosto: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoGeneralPresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso general agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoInversionPresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      concepto: resultado.concepto,
      valor: resultado.valor,
      idTipoInversion: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoInversionPresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso inversión agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoServDocentePresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      nombreMateria: resultado.nombreMateria,
      esDocentePlanta: resultado.esDocentePlanta,
      nombreDocente: resultado.nombreDocente,
      escalafon: resultado.escalafon,
      titulo: resultado.titulo,
      horasTeoricasMat: resultado.horasTeoricasMat,
      horasPracticasMat: resultado.horasPracticasMat,
      valorHoraProfesor: resultado.valorHoraProfesor,
      idTipoCompensacion: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoServDocentePresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso servicio docente agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoOtrosServDocentePresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      servicio: resultado.servicio,
      descripcion: resultado.descripcion,
      numHoras: resultado.numHoras,
      valorTotal: resultado.valorTotal,
      idTipoCosto: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoOtrosServDocentePresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso otro servicio docente agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresosServNoDocentePresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      servicio: resultado.servicio,
      cantidad: resultado.cantidad,
      valorUnitario: resultado.valorUnitario,
      idTipoCosto: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoServNoDocentePresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso servicio no docente agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoRecurrentePresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      unidad: resultado.unidad,
      cargo: resultado.cargo,
      valorHora: resultado.valorHora,
      numHoras: resultado.numHoras,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoRecurrentePresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso recurrente agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoViajePresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      descripcion: resultado.descripcion,
      numPersonas: resultado.numPersonas,
      apoyoDesplazamiento: resultado.apoyoDesplazamiento,
      numViajesPorPersona: resultado.numViajesPorPersona,
      valorTransporte: resultado.valorTransporte,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoViajePresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso viaje agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoTransferenciaPresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      descripcion: resultado.descripcion,
      porcentaje: resultado.porcentaje,
      idTipoTransferencia: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoTransferenciaPresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso transferencia agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoOtroPresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      concepto: resultado.concepto,
      valorUnitario: resultado.valorUnitario,
      cantidad: resultado.cantidad,
      idTipoCosto: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoOtroPresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso Otros agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }

  adicionarEgresoDescuentoPresupuesto(resultado: any, egresoId: number)
  {
    console.log(resultado);
    console.log(egresoId);
    const params = 
    {
      idCdp: parseInt(this.idCdp),
      numEstudiantes: resultado.numEstudiantes,
      valor: resultado.valor,
      numPeriodos: resultado.numPeriodos,
      idTipoDescuento: resultado.entidadPerteneciente,
      idEgresoDelPresupuesto: egresoId,
      descripcionEgresoCDP: resultado.descripcionCDP,
      cpc: resultado.CPC
    }
    console.log(params);

    this.cdpServices.adicionarEgresoDescuentoPresupuesto(params).subscribe((result:any) => {
      console.log(result);
      if (result == 'OK')
        {
          this.toastr.success("Egreso Descuento agregado");
          this.obtenerEgresosDesdePresupuesto();
          this.listarEgresosCDP(this.idCdp);
          
        }
        else
        {
          //this.openBudgetCreationDialog(cohorte);
        }
    })
  }


  listarEgresosCDP(idCdp: string) {
    this.cdpServices.getListaEgresosCDP(idCdp).subscribe((result: any) => {
      if (result !== null) {
        console.log("Entra condicional");
        this.listaEgresosCDP = result.map((egreso: any) => ({
          ...egreso,
          egresoEspecifico: egreso.egresoRecurrenteAdm || egreso.egresoGeneral || egreso.egresoInversion
          || egreso.egresoOtro || egreso.egresoOtroServDocente || egreso.egresoServDocente || egreso.egresoServNoDocente
          || egreso.egresoTransferencia || egreso.egresoViaje || egreso.egresoDescuento
        }));
        console.log(this.listaEgresosCDP);
        this.obtenerEncabezadosEgresosCDPAgregados();
      } else {
        //this.openBudgetCreationDialog(cohorte);
      }
    });
  }
  generarReporePDFEgresosCDP() {
    this.cdpServices.generarPDFdeCDP(this.idCdp).subscribe((data: Blob) => {
      const downloadURL = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = "reporte.pdf";
      link.click();
    });
  }
  

  openConfirmationDialog(rubro:string)
  {
    const dialogRef = this.dialog.open(PopupConfirmarRubroComponent, {
      width: '300px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
      if (result.confirmacion == 'si') {
        this.mostrarSeccionEgresos = true;
        this.activarCampos = false;
        this.crearCDP(rubro);
        
      }

    });
  }

  prellenarCampos()
  {
    this.facultadCohorte = sessionStorage.getItem('nombreFacultad');
    this.programaCohorte = sessionStorage.getItem('nombrePrograma');
    this.numeroCohorte = sessionStorage.getItem('idCohorte');
  }

}
