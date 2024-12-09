import puppeteer, { Browser } from "puppeteer";
import winston from "winston";

let browser: Browser | null = null;

export const NewBrowser = async (log: winston.Logger): Promise<Browser> => {
    if (browser) {
        return browser;
    }
    
    try {
        browser = await puppeteer.launch();
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
