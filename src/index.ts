import dotenv from "dotenv";
import { logger } from './bootstrap/logger';
import route from './route/route'
import { NewPubSubClient } from './bootstrap/pubsub';
import { ServerConfig } from './config/config';
import { NewBrowser } from './bootstrap/puppeteer';

dotenv.config()

const log  = logger

const pubsubClient = NewPubSubClient(log)
const puppeteer = NewBrowser(log)

route.NewRoute(pubsubClient, puppeteer, log)