import jsPDF from "jspdf";

export const generatePDFReport = (): void => {
  const doc = new jsPDF();
  doc.text("raport", 10, 10);
  doc.save("raport.pdf");
};
