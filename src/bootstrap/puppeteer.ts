import puppeteer, { Browser } from "puppeteer";
import winston from "winston";
import { PuppeteerExPath } from "../config/config";

let browser: Browser | null = null;

export const NewBrowser = async (log: winston.Logger): Promise<Browser> => {
    if (browser) {
        return browser;
    }
    
    try {
        browser = await puppeteer.launch({
            executablePath: PuppeteerExPath
        });
        return browser;
    } catch (error) {
        log.error("Error launching browser:", error);
        log.info(`===============| INFO |================ ${PuppeteerExPath}`)
        throw error;
    }
};

export const CloseBrowser = async (): Promise<void> => {
    if (browser) {
        await browser.close();
        browser = null;
    }
};
