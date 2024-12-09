import { PDFOptions } from "puppeteer";

export const PaperConfig: PDFOptions = {
    path: './output/test.pdf',
    format: 'A4',            
    printBackground: true,
}