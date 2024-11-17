import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';


interface Icidade {
    nome: string;
}

const bodyValidation: yup.Schema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const create = async(req: Request<{}, {}, Icidade>, res: Response) => {
    let validatedData: Icidade | undefined= undefined;

    try{
        await bodyValidation.validate(req.body);
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.json({
            errors: {
                default: yupError.message,
        }
        })
    }

    console.log(validatedData);


    return res.send('create');

}

