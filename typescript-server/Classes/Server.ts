import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import Lobby from './Lobby';
import Player from './Player';

export default class Server {

    server: WebSocket.Server<typeof WebSocket, any>;
    lobbies: Lobby[] = [];
    players: Player[] = [];

    constructor(options: ServerOptions<typeof WebSocket, any>) {
        this.server = new WebSocketServer(options);

        this.server.on('connection', (webSocket) => this.onConnection(webSocket));
    }

    onConnection(webSocket: WebSocket) {
        console.log('Client Connected.')
        let player = new Player(webSocket);
        this.players.push(player);
    }
}