import WebSocket, { RawData, WebSocketServer } from 'ws';

export default class Server {

    server: WebSocket.Server<typeof WebSocket, any>;
    lobbies = [];
    players: WebSocket[] = [];


    constructor() {
        this.server = new WebSocketServer({ port: 8082 });

        this.server.on('connection', (webSocket) => this.onConnection(webSocket));
    }

    onConnection(webSocket: WebSocket) {
        webSocket.on('message', data => this.message(data));
        
        webSocket.on('close', function () {
            console.log('Client Disconnected!');
        });

        this.players.push(webSocket);
    }

    message(data: RawData)
    {
        let info = JSON.parse(data.toString());
        console.log(info);
    }
}