import { PDFOptions } from "puppeteer";

export const PaperConfig: PDFOptions = {
    path: './output',
    format: 'A4',            
    printBackground: true,
}