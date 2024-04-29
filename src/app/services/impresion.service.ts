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
    doc.text("Programa: " + presupuesto.cohorte.programa.nombre, 20, 90);
    doc.text("Cohorte: " + presupuesto.cohorte.numero, 20, 105);
    doc.text("Fecha de inicio: " + presupuesto.cohorte.fecha, 20, 120);

    // Inicializa la altura actual debajo de la la fecha de inicio de la cohorte
    let currentHeight = 130;

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

    doc.addPage();
    doc.setFontSize(14);
    doc.text("Resumen de la cohorte", doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });
    doc.setFontSize(12);

    doc.text("Total de ingresos (menos descuentos): " + presupuesto.ingresosTotales, 20, 60);
    doc.text("Total de egresos del programa: " + presupuesto.egresosProgramaTotales, 20, 75);
    doc.text("Total de egresos recurrentes para la universidad: " + presupuesto.egresosRecurrentesUniversidadTotales, 20, 90);
    doc.text("Balance general: " + presupuesto.balanceGeneral, 20, 105);



    if (guardar) {
      const hoy = new Date();
      doc.save(hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear() + '-' + hoy.getTime() + '.pdf');
    } else {

    }
  }



}
