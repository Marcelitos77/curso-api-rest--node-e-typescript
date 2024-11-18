import { Request, Response, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from '@middleware/validation';

 
interface Icidade {
    nome: string;
    estado: string;
}

const bodyValidation: yup.Schema<Icidade> = yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(3),
});

interface Ifilter {
}
const queryValidation: yup.Schema<Ifilter> = yup.object().shape({
});

export const createQueryValidator: RequestHandler = async(req, res, next) => {
try{
    await queryValidation.validate(req.query, { abortEarly: false });
    return next();
 } catch (error) {
    const yupError = error as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
        if (error.path === undefined) return;
        errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
}

}


export const createValidation = validation(queryValidation);




export const create = async(req: Request<{}, {}, Icidade>, res: Response) => {
    let validatedData: Icidade | undefined = undefined;

    try {
        validatedData = await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors
        });
    }

    console.log(validatedData);

    return res.send('create');
}
