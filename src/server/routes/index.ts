
import { Router } from "express";
import { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';

const router =  Router();


router.get('/', (req: Request, res: Response) => {
    return res.send('Olá, DEV!');
});

router.post('/teste', (req: Request, res: Response) => {
    console.log(req.body);
    return res.status(StatusCodes.UNAUTHORIZED).json(req.body);
});

export { router };