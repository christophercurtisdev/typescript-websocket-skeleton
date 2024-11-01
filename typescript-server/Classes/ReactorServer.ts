import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import Lobby from './Lobby';
import Player from './Player';

export default class ReactorServer {

    private static singleton: ReactorServer;
    webSocketServer: WebSocket.Server<typeof WebSocket, any>;
    lobbies: any = {};
    players: Player[] = [];


    static instance(options?: ServerOptions<typeof WebSocket, any>) {
        if (ReactorServer.singleton) {
            return ReactorServer.singleton;
        } else {
            let newServer = new ReactorServer(options ?? {});
            ReactorServer.singleton = newServer;
            return newServer;
        }
    }

    static createLobby(player: Player): Lobby {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lobbyCode = "";
        const randomArray = new Uint8Array(4);
        crypto.getRandomValues(randomArray);
        randomArray.forEach((number) => {
            lobbyCode += chars[number % chars.length];
        });
        
        console.log('Creating a new lobby: '+lobbyCode);
        let lobby = new Lobby(lobbyCode);
        lobby.addPlayer(player);
        ReactorServer.instance().lobbies[lobbyCode] = lobby;
        return lobby;
    }

    static joinLobby(player: Player, code: string): Lobby {
        let lobbies = ReactorServer.instance().lobbies;
        if (lobbies[code]) {
            lobbies[code].addPlayer(player);
            return lobbies[code]
        }
        console.log(`Lobby ${code} not found.`);
        return new Lobby('');
    }

    static destroyLobby(lobby: Lobby) {
        let lobbies = ReactorServer.instance().lobbies;
        let code = lobby.code;
        if (lobbies[code]) {
            lobbies[code].stopGame();
        }
        delete lobbies[code];
    }

    private constructor(options: ServerOptions<typeof WebSocket, any>) {
        this.webSocketServer = new WebSocketServer(options);
        this.webSocketServer.on('connection', (webSocket, request) => this.onConnection(webSocket, request));
        ReactorServer.singleton = this;
    }

    private onConnection(webSocket: WebSocket, request: any) {
        console.log('Client Connected.');
        let player = new Player(webSocket);
        this.players.push(player);
    }
}