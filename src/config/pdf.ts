import { PDFOptions } from "puppeteer-core";

export const PaperConfig: PDFOptions = {
    path: './output',
    format: 'A4',            
    printBackground: true,
}