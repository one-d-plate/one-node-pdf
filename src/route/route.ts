import { Subscription } from "@google-cloud/pubsub";
import { Browser } from "puppeteer";
import winston from "winston";
import Raya from "../service/raya"

let logger: winston.Logger | null = null
let browser: Browser | null

const NewRoute = async (subscription: Subscription, puppeteer: Promise<Browser>, log: winston.Logger) => {
    log.info("Running service")
    try {
        if (!logger) {
            logger = log
        }

        if (!browser) {
            browser = await puppeteer
        }

        subscription.on('message', message => {
            log.info(`Received message: ${message.id}`);

            const jsonString = message.data.toString();
            const jsonData   = JSON.parse(jsonString);

            message.ack();
            
            const docType  = jsonData.doc;
            const data     = jsonData.data;
            const filename = jsonData.doc_name;

            log.info(data)
            routing(docType, filename, data)
        });

        subscription.on('error', error => {
            log.error(`Received error: ${error}`);
        });

    } catch (error) {
        log.error("erro routing PubSub client: ", error);
    }
}

const routing = (route: string, filename: string, data: any) => {
    const routes: { [key: string]: Promise<void> } = {
        raya: Raya.ToPdf(browser as Browser, filename, data, logger as winston.Logger),
    };

    routes[route]
}

export default {
    NewRoute
}
