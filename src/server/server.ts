import express from 'express';
import { Request, Response } from 'express';
import { router } from './routes/index';
import 'dotenv/config';
import './shared/middwares/services/translationsYup';

const server = express();

server.use(express.json());
server.use(router);

export { server };