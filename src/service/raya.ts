import winston from "winston";
import { CloseBrowser } from "../bootstrap/puppeteer";
import { Browser } from "puppeteer";
import fs from 'fs';
import ejs from 'ejs';
import { PaperConfig } from "../config/pdf";

const ToPdf = async (browser: Browser, data: any, log: winston.Logger) => {
    let page;
    try {
        page = await browser.newPage();
        const htmlPage = await render(data);
        await page.setContent(htmlPage, { waitUntil: 'domcontentloaded' });   
        await page.pdf(PaperConfig);

        log.info("Berhasil render");
    } catch (error) {
        log.error("Failed to convert pdf in raya", error);
    } finally {
        if (page) {
            await page.close();
        }
        await CloseBrowser();
        process.exit(0); 
    }
};

const render = async (data: { name: string; age: number }): Promise<string> => {
    const template = fs.readFileSync('./src/renderer/raya/assesment.ejs', 'utf-8');
    const renderedHtml = ejs.render(template, data);
    return renderedHtml;
};

export default {
    ToPdf
};
