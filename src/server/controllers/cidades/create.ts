import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';


interface Icidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.Schema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

export const create = async(req: Request<{}, {}, Icidade>, res: Response) => {
    let validatedData: Icidade | undefined= undefined;

    try{
        await bodyValidation.validate(req.body, {abortEarly: false});
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {
        };

        yupError.inner.forEach(error => {
           if(error.path === undefined) return;
           errors[error.path] = error.message;
        })

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        })
    }

    console.log(validatedData);


    return res.send('create');

}

