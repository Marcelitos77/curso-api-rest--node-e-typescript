import { server } from './server/server';


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

server.listen(port, () => {
    console.log(`App rodando na porta ${port}!`);
});