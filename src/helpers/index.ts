import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const createCanvas = (element: HTMLElement) => html2canvas(element);
const getImageData = (canvas: HTMLCanvasElement) =>
  canvas.toDataURL("image/png");
const createPDF = () => new jsPDF("p", "mm", "a4");

const calculateDimensions = (pdf: jsPDF, imgProps: any) => {
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pdfWidth - 2 * margin;
  const scaleFactor = 0.7;
  const contentHeight =
    ((contentWidth * imgProps.height) / imgProps.width) * scaleFactor;
  return {
    pdfWidth,
    pdfHeight,
    margin,
    contentWidth,
    contentHeight,
    scaleFactor,
  };
};

const addImageToPDF = (
  pdf: jsPDF,
  imgData: string,
  yPosition: number,
  { margin, contentWidth, scaleFactor, pdfHeight, contentHeight }: any
) => {
  const remainingHeight = pdfHeight - yPosition;
  const heightToDraw = Math.min(contentHeight, remainingHeight);
  pdf.addImage(
    imgData,
    "PNG",
    margin,
    yPosition,
    contentWidth * scaleFactor,
    heightToDraw
  );
  return yPosition + heightToDraw;
};

const generatePDFReport = async (): Promise<void> => {
  const element = document.getElementById("popup-content");
  if (!element) return;

  try {
    const watermarkText =
      "Odblokuj pełny potencjał z naszą wersją premium! Pokażemy Ci najlepsze praktyki w zabezpieczaniu Twojej własności intelektualnej przed nieautoryzowanym wykorzystaniem.";
    element.innerHTML += `<div style="text-align: center; color: #007bff; font-weight: bold; margin-top: 20px; padding: 10px; background-color: #f0f8ff; border-radius: 5px;">${watermarkText}</div>`;

    const canvas = await createCanvas(element);
    const imgData = getImageData(canvas);
    const pdf = createPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const dimensions = calculateDimensions(pdf, imgProps);

    let yPosition = dimensions.margin;

    while (yPosition < dimensions.pdfHeight) {
      yPosition = addImageToPDF(pdf, imgData, yPosition, dimensions);

      if (yPosition < dimensions.pdfHeight - dimensions.margin) {
        pdf.addPage();
        yPosition = dimensions.margin;
      } else {
        break;
      }
    }

    pdf.save("report.pdf");
  } catch (error) {
    console.error("Error generating PDF report:", error);
  }
};

export { generatePDFReport };
