import { Component } from '@angular/core';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';
import { IngresosService } from '@app/services/ingresos.service';

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
  ingresosTotales:any;

  constructor(private cohortesService: CohortesService,
    private route:ActivatedRoute,
    private presupuestosServices: PresupuestosService,
    private ingresosServices: IngresosService,
    public dialog: MatDialog,
    private router2: Router,
    private formBuilder: FormBuilder) {
      this.presupuestoForm = this.formBuilder.group({
        idCohorte: '',
        observaciones: '',
      });
    }

    ngOnInit()
    {
      this.idPresupuestoString = localStorage.getItem('idPresupuesto');
      console.log(this.idPresupuestoString);
      localStorage.removeItem('idPresupuesto');
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
          this.ingresosTotales = result.ingresosTotales;

          console.log(this.idPresupuesto);
          console.log(this.numeroCohorte);
          console.log(this.programaCohorte);
          console.log(this.ingresosTotales);

          console.log(result.id);
          localStorage.setItem('idPresupuesto', result.id);

          console.log(this.idPresupuesto);
          
    });

  }

  

}
