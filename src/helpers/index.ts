import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDFReport = async () => {
  const element = document.getElementById("popup-content");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("report.pdf");
};

export { generatePDFReport };
