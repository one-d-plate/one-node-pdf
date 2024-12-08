import express from 'express'
import dotenv from "dotenv";
import { logger } from './bootstrap/logger';
import route from './route/route'
import { NewPubSubClient } from './bootstrap/pubsub';
import { ServerConfig } from './config/config';

dotenv.config()

const app  = express()
app.use(express.json())

const port = ServerConfig.port
const log  = logger

const pubsubClient = NewPubSubClient(log)
route.NewRoute(pubsubClient, log)

app.listen(port, () => {
    console.log(`Server is running on http://${ServerConfig.host}:${port}`);
})