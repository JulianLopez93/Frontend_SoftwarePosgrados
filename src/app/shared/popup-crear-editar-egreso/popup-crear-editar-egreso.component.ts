import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-crear-editar-egreso',
  templateUrl: './popup-crear-editar-egreso.component.html',
  styleUrls: ['./popup-crear-editar-egreso.component.css']
})
export class PopupCrearEditarEgresoComponent {

  listaPerteneciente:any [] = []
  entidadSeleccionada:number = 0;
  nombreIngresado:string = '';
  showError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PopupCrearEditarEgresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      console.log(data.modulo);
      console.log(data.numero);
      console.log(data.fecha);
      console.log(data.nombre);
      console.log(data.isEdit);
      console.log(data.listaDepartamentos);
      console.log(data.listaFacultades);
      console.log(data.listaProgramas);
      
      this.listaPerteneciente = data.listaTipoPerteneciente;
      console.log(this.listaPerteneciente);

      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onAccept():void {
      this.showError = false;

      let descripcion;
      let porcentaje;
      let concepto;
      let unidad;
      let cargo;
      let valor;
      let valorHora;
      let valorUnitario;
      let valorTotal;
      let valorTransporte;
      let cantidad;
      let servicio;
      let numHoras;
      let numPersonas;
      let apoyoDesplazamiento;
      let numViajesPorPersona;

      //Campos egresos servicios docentes
      let nombreMateria;
      let esDocentePlanta;
      let nombreDocente;
      let escalafon;
      let titulo;
      let horasTeoricasMat;
      let horasPracticasMat;
      let valorHoraProfesor;

      const entidadPerteneciente = this.entidadSeleccionada;
      descripcion = this.data.descripcion;
      porcentaje = this.data.porcentaje;
      concepto = this.data.concepto;
      unidad = this.data.unidad;
      cargo = this.data.cargo;
      valorHora = this.data.valorHora;
      valorUnitario = this.data.valorUnitario;
      cantidad = this.data.cantidad;
      servicio = this.data.servicio;
      numHoras = this.data.numHoras;
      numPersonas = this.data.numPersonas;
      numViajesPorPersona = this.data.numViajesPorPersona;
      apoyoDesplazamiento = this.data.apoyoDesplazamiento;
      valorTotal = this.data.valorTotal;
      valorTransporte = this.data.valorTransporte;
      valor = this.data.valor;

      //Egresos servicios docentes
      nombreMateria = this.data.nombreMateria;
      esDocentePlanta = this.data.esDocentePlanta;
      nombreDocente = this.data.nombreDocente;
      escalafon = this.data.escalafon;
      titulo = this.data.titulo;
      horasTeoricasMat = this.data.horasTeoricasMat;
      horasPracticasMat = this.data.horasPracticasMat;
      valorHoraProfesor = this.data.valorHoraProfesor;

      console.log(entidadPerteneciente);
      console.log(descripcion);
      console.log(porcentaje);
      console.log(unidad);
      console.log(cargo);
      console.log(concepto);
      console.log(valorHora);
      console.log(valor);
      console.log(valorUnitario);
      console.log(valorTotal);
      console.log(numHoras);
      console.log(cantidad);
      console.log(servicio);
      console.log(numPersonas);
      console.log(numViajesPorPersona);
      console.log(apoyoDesplazamiento);
      console.log(valorTransporte);

      //Egresos servicios docentes
      console.log(nombreMateria);
      console.log(esDocentePlanta);
      console.log(nombreDocente);
      console.log(escalafon);
      console.log(titulo);
      console.log(horasTeoricasMat);
      console.log(horasPracticasMat);
      console.log(valorHoraProfesor);

      // Construye el objeto que se devuelve dependiendo del módulo
      let result;
      if (this.data.modulo === 'egreso transferencia') {
        if (!this.data.descripcion || !this.data.porcentaje || this.entidadSeleccionada === 0
          || isNaN(this.data.porcentaje)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          descripcion: descripcion,
          porcentaje: porcentaje
        };
      }
      else if (this.data.modulo === 'egreso general' || this.data.modulo === 'otro egreso') {
        if (!this.data.concepto || !this.data.valorUnitario || this.entidadSeleccionada === 0
          || isNaN(this.data.valorUnitario) || isNaN(this.data.cantidad)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          concepto: concepto,
          valorUnitario: valorUnitario,
          cantidad: cantidad
        };
      } 
      else if (this.data.modulo === 'egreso servicio no docente') {
        if (!this.data.servicio|| !this.data.valorUnitario || this.entidadSeleccionada === 0
          || isNaN(this.data.valorUnitario) || isNaN(this.data.cantidad)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          servicio: servicio,
          valorUnitario: valorUnitario,
          cantidad: cantidad
        };
      } 
      else if (this.data.modulo === 'egreso otros servicios docente') {
        if (!this.data.servicio || !this.data.valorTotal || this.entidadSeleccionada === 0
          || !this.data.descripcion || !this.data.numHoras
          || isNaN(this.data.valorTotal) || isNaN(this.data.numHoras)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          servicio: servicio,
          descripcion: descripcion,
          numHoras: numHoras,
          valorTotal: valorTotal,
        };
      } 
      else if (this.data.modulo === 'egreso inversion') {
        if (!this.data.concepto || !this.data.valor || this.entidadSeleccionada === 0
          || isNaN(this.data.valor)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          concepto: concepto,
          valor: valor,
        };
      }
      else if (this.data.modulo === 'egreso recurrente') {
        if (!this.data.unidad || !this.data.cargo || !this.data.valorHora 
          || !this.data.numHoras
          || isNaN(this.data.valorHora) || isNaN(this.data.numHoras)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          unidad: unidad,
          cargo: cargo,
          numHoras: numHoras,
          valorHora: valorHora,
        };
      } 
      else if (this.data.modulo === 'egreso viaje') {
        if (!this.data.descripcion || !this.data.numPersonas || !this.data.apoyoDesplazamiento 
          || !this.data.numViajesPorPersona || !this.data.valorTransporte
          || isNaN(this.data.numPersonas) || isNaN(this.data.numViajesPorPersona)
          || isNaN(this.data.apoyoDesplazamiento) || isNaN(this.data.valorTransporte)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          descripcion: descripcion,
          numPersonas: numPersonas,
          apoyoDesplazamiento: apoyoDesplazamiento,
          numViajesPorPersona: numViajesPorPersona,
          valorTransporte: valorTransporte
        };
      }
      else if (this.data.modulo === 'egreso servicio docente') {
        if (!this.data.nombreMateria || !this.data.nombreDocente 
          || !this.data.escalafon || !this.data.titulo || !this.data.horasTeoricasMat
          || !this.data.horasPracticasMat || !this.data.valorHoraProfesor
          || this.entidadSeleccionada === 0
          || isNaN(this.data.horasTeoricasMat) || isNaN(this.data.horasPracticasMat)
          || isNaN(this.data.valorHoraProfesor)) {
          this.showError = true; // Muestra el mensaje de error
          return; // Detiene la ejecución si hay campos vacíos
        }
        result = {
          entidadPerteneciente: entidadPerteneciente,
          nombreMateria: nombreMateria,
          esDocentePlanta: esDocentePlanta,
          nombreDocente: nombreDocente,
          escalafon: escalafon,
          titulo: titulo,
          horasTeoricasMat: horasTeoricasMat,
          horasPracticasMat: horasPracticasMat,
          valorHoraProfesor: valorHoraProfesor
        };
      }
      else {
      }

      this.dialogRef.close(result);
    }
}
