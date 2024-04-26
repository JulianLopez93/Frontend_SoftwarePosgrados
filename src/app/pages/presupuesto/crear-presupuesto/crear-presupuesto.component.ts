import { Component } from '@angular/core';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { IngresosService } from '@app/services/ingresos.service';
import { EgresosService } from '@app/services/egresos.service';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent {

  listaCohortes:any[] = [];
  cohorteSeleccionada:number = 0;
  observaciones:string = '';
  presupuestoForm: FormGroup = new FormGroup({});
  idCohorte: number = 0;
  idPresupuesto: number = 0;
  idPresupuestoString:any;
  numeroCohorte:any;
  programaCohorte:any;
  departamentoCohorte:any;
  facultadCohorte:any;
  ingresosTotales:any;
  egresosTotalesPrograma:any;
  egresosTotalesRecurrentes:any;  
  balanceGeneral:any;

  totalEgresosTransferencia:any;
  totalEgresosGenerales:any;
  totalEgresosOtros:any;
  totalEgresosServNoDocentes:any;
  totalEgresosOtrosServDocentes:any;
  totalEgresosInversiones:any;
  totalEgresosRecurrentes:any;
  totalEgresosViajes:any;
  totalEgresosServDocentes:any;
  paginaActual = 1;

  constructor(private cohortesService: CohortesService,
    private route:ActivatedRoute,
    private presupuestosServices: PresupuestosService,
    private ingresosServices: IngresosService,
    private egresosServices: EgresosService,
    public dialog: MatDialog,
    private router2: Router,
    private formBuilder: FormBuilder) {
      this.presupuestoForm = this.formBuilder.group({
        observaciones: '',
      });
    }

    ngOnInit()
    {
      this.idPresupuestoString = localStorage.getItem('idPresupuesto');
      console.log(this.idPresupuestoString);
      console.log(this.paginaActual);
      
      if(sessionStorage.getItem('paginaPresupuesto') == '' || Number(sessionStorage.getItem('paginaPresupuesto')) == 0)
        {
          this.paginaActual = 1;
        }
      else
        {
          this.paginaActual = Number(sessionStorage.getItem('paginaPresupuesto'));
        }
      console.log(this.paginaActual);
      //localStorage.removeItem('idPresupuesto');
      this.idCohorte = parseInt(this.route.snapshot.paramMap.get('idCohorte') || '');

      if(this.idPresupuestoString === null)
        {
          this.crearPresupuesto(this.idCohorte);
        }
      else
      {
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

    enviarParaRevision()
    {
      this.presupuestosServices.sendPresupuestoForReview(this.idPresupuesto).subscribe((result: any)=>{
        console.log(result);
        if (result == 'OK')
          {
            console.log("Presupuesto guardado");
            this.router2.navigate(['cohortes/listar-cohortes']);
          }
      })
    }

    /*
    guardarBorrador()
    {
      this.observaciones = this.presupuestoForm.value
      this.presupuestosServices.editPresupuesto(this.idPresupuesto,)
    }
    */

    redirectTo()
    {
      this.router2.navigate(['cohortes/listar-cohortes']);

    }

    obtenerTotalEgresosTransferencia()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosTransferencia(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosTransferencia = result;
      }) 
    }

    obtenerTotalEgresosGenerales()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosGenerales(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosGenerales = result;
      }) 
    }

    obtenerTotalEgresosOtros()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosOtros(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosOtros = result;
      }) 
    }

    obtenerTotalEgresosServiciosNoDocentes()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosServiciosNoDocentes(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosServNoDocentes = result;
      }) 
    }

    obtenerTotalEgresosOtrosServiciosDocentes()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosOtrosServiciosDocentes(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosOtrosServDocentes = result;
      }) 
    }

    obtenerTotalEgresosInversiones()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosInversiones(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosInversiones = result;
      }) 
    }

    obtenerTotalEgresosRecurrentes()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosRecurrentes(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosRecurrentes = result;
      }) 
    }

    obtenerTotalEgresosViajes()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosViajes(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosViajes = result;
      }) 
    }

    obtenerTotalEgresosServiciosDocentes()
    {
      console.log(this.idPresupuesto);
      this.egresosServices.getTotalEgresosServiciosDocentes(this.idPresupuesto).subscribe((result:any) =>{
        console.log(result);
        this.totalEgresosServDocentes = result;
      }) 
    }


    crearPresupuesto(idCohorte:any)
  {
    try
    {

      console.log(idCohorte);
      //console.log(this.cohorteSeleccionada);
      //console.log(this.observaciones);
     
      const params =
      {
        idCohorte: idCohorte
      }
      //console.log(this.presupuestoForm.value);
      console.log(params);
      this.presupuestosServices.postPresupuesto(params).subscribe((result:any) => {
        console.log(result);
        if (result = "OK")
        {
          console.log("Presupuesto guardado");
          this.obtenerPresupuestoPorCohorte(idCohorte);
          //this.router2.navigate(['presupuestos/listar-presupuestos']);
        }

      });
    }
    catch(error)
      {

      }
  }

  obtenerPresupuestoPorCohorte(idCohorte:number)
  {
    this.presupuestosServices.getPresupuestoPorCohorte(idCohorte).subscribe((result:any) =>{
      console.log(result);
          this.idPresupuesto = result.id;
          this.numeroCohorte = result.cohorte.numero;
          this.programaCohorte = result.cohorte.programa.nombre;
          this.departamentoCohorte = result.cohorte.programa.departamento.nombre;
          this.facultadCohorte = result.cohorte.programa.departamento.facultad.nombre;
          this.ingresosTotales = result.ingresosTotales;
          this.egresosTotalesPrograma = result.egresosProgramaTotales;
          this.egresosTotalesRecurrentes = result
          .egresosRecurrentesUniversidadTotales;
          this.balanceGeneral = result.balanceGeneral;

          this.obtenerTotalEgresosTransferencia();
          this.obtenerTotalEgresosGenerales();
          this.obtenerTotalEgresosInversiones();
          this.obtenerTotalEgresosOtros();
          this.obtenerTotalEgresosOtrosServiciosDocentes();
          this.obtenerTotalEgresosRecurrentes();
          this.obtenerTotalEgresosServiciosNoDocentes();
          this.obtenerTotalEgresosViajes();
          this.obtenerTotalEgresosServiciosDocentes();


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
          
    });

  }

  

}
