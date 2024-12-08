import { Subscription } from "@google-cloud/pubsub";
import winston from "winston";

const NewRoute = (subscription: Subscription, log: winston.Logger) => {
    try {
        subscription.on('message', message => {
            log.info(`Received message: ${message.id}`);
            log.info(`Data: ${message.data.toString()}`);
            
            message.ack();
        });
    
        subscription.on('error', error => {
            log.error(`Received error: ${error}`);
        });
    
    } catch (error) {
        log.error("erro routing PubSub client: ", error);
    }
}

export default {
    NewRoute
}