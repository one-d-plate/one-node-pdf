import { Subscription } from "@google-cloud/pubsub";
import { Browser } from "puppeteer";
import winston from "winston";
import Raya from "../service/raya"

let logger: winston.Logger | null = null
let browser: Browser | null

const NewRoute = async (subscription: Subscription, puppeteer: Promise<Browser>, log: winston.Logger) => {
    try {
        if (!logger) {
            logger = log
        }

        if (!browser) {
            browser = await puppeteer
        }

        subscription.on('message', message => {
            log.info(`Received message: ${message.id}`);
            log.info(`Data: ${message.data.toString()}`);

            const jsonString = message.data.toString();
            const jsonData = JSON.parse(jsonString);

            const docType = jsonData.doc;
            routing(docType)

            message.ack();
        });

        subscription.on('error', error => {
            log.error(`Received error: ${error}`);
        });

    } catch (error) {
        log.error("erro routing PubSub client: ", error);
    }
}

const routing = (route: string) => {
    const routes: { [key: string]: Promise<void> } = {
        raya: Raya.ToPdf(browser as Browser, logger as winston.Logger),
    };

    routes[route]
}

export default {
    NewRoute
}
