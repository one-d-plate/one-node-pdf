import puppeteer, { Browser } from "puppeteer-core";
import winston from "winston";
import { PuppeteerExPath } from "../config/config";

let browser: Browser | null = null;

export const NewBrowser = async (log: winston.Logger): Promise<Browser> => {
    if (browser) {
        return browser;
    }
    
    try {
        browser = await puppeteer.launch({
            executablePath: PuppeteerExPath,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        return browser;
    } catch (error) {
        log.error("Error launching browser:", error);
        throw error;
    }
};

export const CloseBrowser = async (): Promise<void> => {
    if (browser) {
        await browser.close();
        browser = null;
    }
};
