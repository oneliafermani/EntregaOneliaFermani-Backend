//const http = require ('http')
import http from 'http'

const server = http.createServer()

server.listen(8080, () => {
    console.log('Escuchando en el puerto 8080 - http');
});
