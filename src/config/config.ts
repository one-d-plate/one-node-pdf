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

export const LoadCredentials = (filePath: string): JWTInput | undefined => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const credentials: JWTInput = JSON.parse(data);
        return credentials;
    } catch (error) {
        console.error('Error loading credentials:', error);
        return undefined;
    }
};

const credentialsPath = './deploy/one-d-444103-fcff363b7c33.json';
const credentials = LoadCredentials(credentialsPath);

export const PubSubConfig: ClientConfig = {
    credentials: EnvCheck(ServerConfig.env as string) == 'local' ? credentials : undefined,
    projectId: process.env.PUBSUB_PROJECT_ID
};

export const SubscriptionName = process.env.PUBSUB_SUBSCRIPTION_NAME