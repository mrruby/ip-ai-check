import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDFReport = async (): Promise<void> => {
  const element = document.getElementById("popup-content");
  if (!element) return;

  try {
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 10;
    const contentWidth = pdfWidth - 2 * margin;
    const contentHeight = (contentWidth * imgProps.height) / imgProps.width;

    let yPosition = margin;

    while (yPosition < pdfHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        yPosition,
        contentWidth,
        contentHeight
      );
      yPosition += contentHeight;

      if (yPosition < pdfHeight) {
        pdf.addPage();
      }
    }

    pdf.save("report.pdf");
  } catch (error) {
    console.error("Error generating PDF report:", error);
  }
};

export { generatePDFReport };
