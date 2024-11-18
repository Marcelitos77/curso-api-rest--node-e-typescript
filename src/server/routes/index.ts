import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CidadesController } from './../controllers';
import * as yup from 'yup';

const router = Router();

const schema = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
});

const validate = (schema: yup.ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    return res.status(400).json({ errors: (err as yup.ValidationError).errors });
  }
};

router.get('/', (req: Request, res: Response) => {
  return res.send('Olá, DEV!');
});

router.post('/cidades', 
  CidadesController.createQueryValidator,
  CidadesController.createValidation,
  CidadesController.create
);

export { router };