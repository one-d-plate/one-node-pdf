import { configDotenv } from "dotenv";
import { IServer } from "../dto/dto";
import { ClientConfig } from "@google-cloud/pubsub";
import { EnvCheck } from "../util/util";
import { GoogleAuthOptions, JWTInput } from 'google-auth-library';
import * as fs from 'fs';

configDotenv()

export const ServerConfig: IServer = {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    env: process.env.APP_ENV ?? 'local'
}

const LoadCredentials = (): JWTInput | undefined => {
    const filePath = './deploy/one-d-444103-fcff363b7c33.json';
    
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const credentials: JWTInput = JSON.parse(data);
        return credentials;
    } catch (error) {
        console.error('Error loading credentials:', error);
        return undefined;
    }
};

export const PubSubConfig: ClientConfig = {
    projectId: process.env.PUBSUB_PROJECT_ID,
    credentials: EnvCheck(process.env.APP_ENV) == "local" ? LoadCredentials() : undefined
};


export const SubscriptionName = process.env.PUBSUB_SUBSCRIPTION_NAME ?? undefined

export const PuppeteerExPath = process.env.PUPPETEER_EXECUTABLE_PATH ?? '/usr/bin/chromium-browser'