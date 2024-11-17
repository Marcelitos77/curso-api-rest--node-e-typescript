"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
server_1.server.listen(port, () => {
    console.log(`App rodando na porta ${port}!`);
});
