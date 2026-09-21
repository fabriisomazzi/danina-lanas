import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MESES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

interface Registro {
  fecha: string;
  descripcion: string;
  monto: number;
  categoria?: string;
}

function formatMoney(n: number) {
  return "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });
}

function getMonthKey(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function drawHeader(doc: jsPDF, titulo: string, subtitulo: string) {
  doc.setFillColor(194, 119, 94);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("DANINA", 20, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Lanas, Medias y Ropa", 20, 26);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(titulo, 105, 18, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(subtitulo, 105, 28, { align: "center" });

  doc.setTextColor(45, 42, 38);
}

function drawFooter(doc: jsPDF, pageCount: number) {
  const h = doc.internal.pageSize.getHeight();
  doc.setFillColor(245, 240, 232);
  doc.rect(0, h - 15, 210, 15, "F");
  doc.setFontSize(8);
  doc.setTextColor(154, 146, 138);
  doc.text("Danina - Panel de Administración", 20, h - 7);
  doc.text(`Página ${pageCount}`, 190, h - 7, { align: "right" });
}

export function generarPDFMensual(
  mesActual: string,
  ingresos: Registro[],
  gastos: Registro[]
) {
  const [anio, mes] = mesActual.split("-");
  const nombreMes = MESES[parseInt(mes) - 1];
  const ingresosMes = ingresos.filter((i) => getMonthKey(i.fecha) === mesActual);
  const gastosMes = gastos.filter((g) => getMonthKey(g.fecha) === mesActual);
  const totalIngresos = ingresosMes.reduce((s, i) => s + i.monto, 0);
  const totalGastos = gastosMes.reduce((s, g) => s + g.monto, 0);
  const ganancia = totalIngresos - totalGastos;

  const doc = new jsPDF();
  drawHeader(doc, `Reporte Mensual`, `${nombreMes} ${anio}`);

  let y = 52;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen del Mes", 20, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    head: [["Concepto", "Monto"]],
    body: [
      ["Ingresos", formatMoney(totalIngresos)],
      ["Gastos", formatMoney(totalGastos)],
      ["GANANCIA NETA", formatMoney(ganancia)],
    ],
    theme: "grid",
    headStyles: { fillColor: [194, 119, 94], textColor: 255, fontStyle: "bold" },
    bodyStyles: { fontSize: 11 },
    columnStyles: { 1: { halign: "right", fontStyle: "bold" } },
    margin: { left: 20, right: 20 },
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

  if (ingresosMes.length > 0) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Detalle de Ingresos", 20, y);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [["Fecha", "Descripción", "Categoría", "Monto"]],
      body: ingresosMes
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .map((i) => [
          i.fecha,
          i.descripcion,
          i.categoria || "-",
          formatMoney(i.monto),
        ]),
      theme: "striped",
      headStyles: { fillColor: [34, 139, 34], textColor: 255, fontStyle: "bold" },
      bodyStyles: { fontSize: 9 },
      columnStyles: { 3: { halign: "right" } },
      margin: { left: 20, right: 20 },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
  }

  if (gastosMes.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Detalle de Gastos", 20, y);
    y += 2;

    autoTable(doc, {
      startY: y,
      head: [["Fecha", "Descripción", "Categoría", "Monto"]],
      body: gastosMes
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .map((g) => [
          g.fecha,
          g.descripcion,
          g.categoria || "-",
          formatMoney(g.monto),
        ]),
      theme: "striped",
      headStyles: { fillColor: [194, 50, 50], textColor: 255, fontStyle: "bold" },
      bodyStyles: { fontSize: 9 },
      columnStyles: { 3: { halign: "right" } },
      margin: { left: 20, right: 20 },
    });
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, i);
  }

  doc.save(`Danina-${nombreMes}-${anio}.pdf`);
}

export function generarPDFAnual(
  anio: number,
  ingresos: Registro[],
  gastos: Registro[]
) {
  const doc = new jsPDF();
  drawHeader(doc, `Reporte Anual`, `${anio}`);

  let y = 52;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen por Mes", 20, y);
  y += 2;

  const mesesData: string[][] = [];
  let totalAnualIngresos = 0;
  let totalAnualGastos = 0;

  for (let m = 1; m <= 12; m++) {
    const key = `${anio}-${String(m).padStart(2, "0")}`;
    const ing = ingresos.filter((i) => getMonthKey(i.fecha) === key);
    const gas = gastos.filter((g) => getMonthKey(g.fecha) === key);
    const totIng = ing.reduce((s, i) => s + i.monto, 0);
    const totGas = gas.reduce((s, g) => s + g.monto, 0);
    const gan = totIng - totGas;
    totalAnualIngresos += totIng;
    totalAnualGastos += totGas;

    mesesData.push([
      MESES[m - 1],
      formatMoney(totIng),
      formatMoney(totGas),
      formatMoney(gan),
    ]);
  }

  mesesData.push([
    "TOTAL ANUAL",
    formatMoney(totalAnualIngresos),
    formatMoney(totalAnualGastos),
    formatMoney(totalAnualIngresos - totalAnualGastos),
  ]);

  autoTable(doc, {
    startY: y,
    head: [["Mes", "Ingresos", "Gastos", "Ganancia"]],
    body: mesesData,
    theme: "grid",
    headStyles: { fillColor: [194, 119, 94], textColor: 255, fontStyle: "bold" },
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: "bold" },
      1: { halign: "right" },
      2: { halign: "right" },
      3: { halign: "right", fontStyle: "bold" },
    },
    margin: { left: 20, right: 20 },
    didParseCell: function (data) {
      if (data.row.index === 11) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [245, 240, 232];
      }
    },
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Ingresos por Categoría", 20, y);
  y += 2;

  const cats: Record<string, number> = {};
  ingresos
    .filter((i) => new Date(i.fecha).getFullYear() === anio)
    .forEach((i) => {
      const cat = i.categoria || "otro";
      cats[cat] = (cats[cat] || 0) + i.monto;
    });

  if (Object.keys(cats).length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Categoría", "Total"]],
      body: Object.entries(cats).map(([cat, total]) => [cat, formatMoney(total)]),
      theme: "striped",
      headStyles: { fillColor: [34, 139, 34], textColor: 255, fontStyle: "bold" },
      bodyStyles: { fontSize: 10 },
      columnStyles: { 1: { halign: "right" } },
      margin: { left: 20, right: 20 },
    });

    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 15;
  }

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Gastos por Categoría", 20, y);
  y += 2;

  const gats: Record<string, number> = {};
  gastos
    .filter((g) => new Date(g.fecha).getFullYear() === anio)
    .forEach((g) => {
      const cat = g.categoria || "general";
      gats[cat] = (gats[cat] || 0) + g.monto;
    });

  if (Object.keys(gats).length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Categoría", "Total"]],
      body: Object.entries(gats).map(([cat, total]) => [cat, formatMoney(total)]),
      theme: "striped",
      headStyles: { fillColor: [194, 50, 50], textColor: 255, fontStyle: "bold" },
      bodyStyles: { fontSize: 10 },
      columnStyles: { 1: { halign: "right" } },
      margin: { left: 20, right: 20 },
    });
  }

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, i);
  }

  doc.save(`Danina-Reporte-Anual-${anio}.pdf`);
}
