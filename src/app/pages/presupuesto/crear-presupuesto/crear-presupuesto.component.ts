import { Component } from '@angular/core';
import { CohortesService } from '@app/services/cohortes.service';
import { PresupuestosService } from '@app/services/presupuestos.service';

import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-presupuesto',
  templateUrl: './crear-presupuesto.component.html',
  styleUrls: ['./crear-presupuesto.component.css']
})
export class CrearPresupuestoComponent {

  listaCohortes:any[] = [];
  cohorteSeleccionada:number = 0;
  observaciones:string = '';
  presupuestoForm: any;

  constructor(private cohortesService: CohortesService,
    private route:Router,
    private presupuestosServices: PresupuestosService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
      this.presupuestoForm = this.formBuilder.group({
        idCohorte: '',
        observaciones: '',
      });
    }

    ngOnInit()
    {
      this.obtenerCohortes();

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

    crearPresupuesto()
  {
    try
    {
      console.log(this.cohorteSeleccionada);
      console.log(this.observaciones);
      const params =
      {
        idCohorte: this.cohorteSeleccionada,
        observaciones: this.observaciones,
      }
      console.log(params);
      this.presupuestosServices.postPresupuesto(params).subscribe((result:any) => {
        console.log(result);
        if (result = "Presupuesto guardado")
        {
          console.log("Presupuesto guardado");
          //this.obtenerPresupuestos();
        }

      });
    }
    catch(error)
      {

      }
  }

}
