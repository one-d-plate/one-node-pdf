import { PubSub, Subscription } from "@google-cloud/pubsub";
import winston from "winston";
import { PubSubConfig, SubscriptionName } from "../config/config";

let pubSubClient: PubSub | null = null;

export const NewPubSubClient = (log: winston.Logger): Subscription => {
    try {
        if (!SubscriptionName) {
            throw new Error("Missing required environment variables for PubSub configuration.");
        }

        if (!pubSubClient) {
            pubSubClient = new PubSub({
                projectId: PubSubConfig.projectId
            });
        }

        const subscription = pubSubClient.subscription(SubscriptionName);
        return subscription;
    } catch (error) {
        log.error("Error creating PubSub client: ", error);
        throw error;
    }
}