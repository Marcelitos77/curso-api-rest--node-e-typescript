import express from 'express';
import { Request, Response } from 'express';
import { router } from './routes/index';

const server = express();

server.use(express.json());
server.use(router);

export { server };