import { Request, Response } from "express";

interface Icidade {
    nome: string;
}

export const create = (req: Request<{}, {}, Icidade>, res: Response) => {
    console.log(req.body);



    return res.send('create');
};

