const app = require('../src/app');
const debug = require('debug')('balta:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//criando o servidor
const server = http.createServer(app);



//colocar para ouvir
server.listen(port);
//função do servidor
server.on('error', onError);
//startar o debug
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

//função para sempre ter uma porta disponivel

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if(port >= 0){
        return port;
    }

    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind)//startar o debug

}