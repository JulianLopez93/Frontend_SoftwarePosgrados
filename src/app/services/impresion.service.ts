import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {

  constructor() { }
  imprimir(datos: { encabezado: string[], cuerpo: Array<any>, titulo: string }[], presupuesto: any, guardar?: boolean) {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: 'letter'
    });

    var img = new Image();
    img.src = 'assets/images/logo.png';
    doc.addImage(img, 'JPEG', 30, 10, 50, 50);

    // Agrega el título "Prespuesto de la cohorte" al principio del PDF
    doc.setFontSize(22);
    let titulo = "Presupuesto";
    let splitTitulo = doc.splitTextToSize(titulo, doc.internal.pageSize.getWidth() - 60); // Ajusta el ancho según sea necesario
    doc.text(splitTitulo, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });


    // Agrega la fecha y hora actual debajo del título
    doc.setFontSize(13);
    const fecha = new Date();
    doc.text("Generado el " + fecha.toLocaleString(), doc.internal.pageSize.getWidth() / 2, 50 + (splitTitulo.length - 1) * 16, { align: 'center' }); // Ajusta la posición vertical según el número de líneas del título

    doc.setFontSize(12);

    doc.text("Universidad de Caldas", 20, 90);
    doc.text("Vicerrectoría de Investigaciones y Posgrados", 20, 105);
    doc.text("Presupuesto y costos de programas, proyectos y servicios institucionales", 20, 120);
    doc.text("Facultad: " + presupuesto.cohorte.programa.facultad.nombre, 20, 135);
    doc.text("Programa: " + presupuesto.cohorte.programa.nombre, 20, 150);
    doc.text("Cohorte: " + presupuesto.cohorte.numero, 20, 165);
    doc.text("Fecha de inicio: " + presupuesto.cohorte.fecha, 20, 180);

    // Inicializa la altura actual debajo de la la fecha de inicio de la cohorte
    let currentHeight = 190;

    for (let dato of datos) {
      doc.setFontSize(14);
      doc.text(dato.titulo, doc.internal.pageSize.getWidth() / 2, 25 + currentHeight, { align: 'center' });
      autoTable(doc, {
        head: [dato.encabezado],
        body: dato.cuerpo,
        theme: 'grid',
        startY: currentHeight + 30 // Inicia la tabla en la altura actual + 30

      });


      // Actualiza la altura actual a la posición vertical después de dibujar la tabla
      currentHeight = (doc as any).lastAutoTable.finalY;

      // Si la próxima tabla probablemente excederá la altura de la página, agrega una nueva página
      if (currentHeight > doc.internal.pageSize.getHeight() - 100) {
        doc.addPage();
        currentHeight = 0; // Restablece la altura actual para la nueva página
      }
    }

    doc.text("Observaciones: " + presupuesto.observaciones, 20, currentHeight + 30);
    currentHeight += 30;

    //doc.addPage();
    doc.setFontSize(14);
    doc.text("Resumen general", doc.internal.pageSize.getWidth() / 2, currentHeight + 30, { align: 'center' });
    doc.setFontSize(12);

    doc.text("Total de ingresos (I - D): " + presupuesto.ingresosTotales, 20, currentHeight + 60);
    doc.text("Total de egresos del programa: " + presupuesto.egresosProgramaTotales, 20, currentHeight + 75);
    doc.text("Total de egresos recurrentes para la universidad: " + presupuesto.egresosRecurrentesUniversidadTotales, 20, currentHeight + 90);
    doc.text("Balance general: " + presupuesto.balanceGeneral, 20, currentHeight + 105);



    if (guardar) {
      const hoy = new Date();
      doc.save(hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear() + '-' + hoy.getTime() + '.pdf');
    } else {

    }
  }



}
