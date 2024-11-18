import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

type Tvalidation = (shema: Schema<any>) => RequestHandler;

export const validation: Tvalidation =  (shema) =>  async (req, res, next) => {
    console.log('teste');
    try{
        await shema.validate(req.query, { abortEarly: false });
        return next();
    } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};
    
        yupError.inner.forEach(error => {
            if (error.path === undefined) return;
            errors[error.path] = error.message;
        });
    
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
}

